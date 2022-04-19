<script lang="ts">
  import {
    BufferGeometry,
    Float32BufferAttribute,
    LineBasicMaterial,
    LineSegments,
    Mesh,
    MeshBasicMaterial,
    MeshPhongMaterial,
    PerspectiveCamera,
    PointLight,
    PointLightHelper,
    Points,
    PointsMaterial,
    Scene,
    Uint16BufferAttribute,
    WebGLRenderer,
  } from "three"
  import {onMount} from "svelte"
  import {OrbitControls} from "three/examples/jsm/controls/OrbitControls.js"

  let scene: Scene
  let input: HTMLInputElement
  let camera: PerspectiveCamera

  async function fileChange() {
    const view = new DataView(await input.files[0].arrayBuffer())

    let vertices = []
    // read xyz values (float32) until the end of the file
    for (let i = 0x2a_20; i < 0x1_6e_88; i += 0x1c) {
      vertices.push(
        view.getFloat32(i, true),
        view.getFloat32(i + 0x4, true),
        view.getFloat32(i + 0x8, true),
        /*view.getFloat32(i + 0xc, true),
        view.getFloat32(i + 0x10, true),
        view.getFloat32(i + 0x14, true),*/
      )
    }

    let indices = []
    for (let i = 0x2_90; i < 0x2a_20; i += 0xa) {
      indices.push(
        view.getUint16(i, true),
        view.getUint16(i + 0x2, true),
        view.getUint16(i + 0x4, true),
        view.getUint16(i + 0x2, true),
        view.getUint16(i + 0x4, true),
        view.getUint16(i + 0x6, true),
      )
    }
    console.log(vertices.length, vertices.length / 3)
    console.log(indices.length, indices.length / 3)

    const geometry = new BufferGeometry()
    geometry.setAttribute(
      "position",
      new Float32BufferAttribute(
        vertices.map(it => it / 1),
        3,
      ),
    )

    geometry.setIndex(indices.map(it => it + 0))
    const material = new MeshPhongMaterial({color: 0xff_ff_ff, wireframe: true})
    const points = new Mesh(geometry, material)
    scene.add(points)

    camera.lookAt(points.position)
  }

  onMount(async () => {
    scene = new Scene()
    camera = new PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 100_000)
    const renderer = new WebGLRenderer()
    document.body.append(renderer.domElement)
    const controls = new OrbitControls(camera, renderer.domElement)
    renderer.setClearColor(0xff_ff_ff)
    renderer.setSize(window.innerWidth, window.innerHeight)
    camera.position.set(0, 20, 100)
    controls.update()

    const light = new PointLight(0xff_00_ff, 1, 100)
    light.position.set(20, 20, 20)
    scene.add(light)
    const sphereSize = 4
    const pointLightHelper = new PointLightHelper(light, sphereSize)
    scene.add(pointLightHelper)

    function animate() {
      requestAnimationFrame(animate)
      controls.update()
      renderer.render(scene, camera)
    }
    animate()
  })
</script>

<input bind:this={input} on:change={fileChange} accept=".nud" type="file" name="filename" />
<p>Path files are just a straight list of little endian float32 3d points, no metadata.</p>
<p>
  Each of the paths in a folder connect, so you can load multiple files at once by selecting them on after
  another
</p>
<p>To clear old results, reload the page</p>
