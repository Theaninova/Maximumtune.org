<script lang="ts">
  import {
    BufferGeometry,
    Float32BufferAttribute,
    Line,
    LineBasicMaterial,
    PerspectiveCamera,
    Points,
    PointsMaterial,
    Scene,
    Vector3,
    WebGLRenderer,
  } from "three"
  import {onMount} from "svelte"
  import {OrbitControls} from "three/examples/jsm/controls/OrbitControls.js"
  import type {ConvertedLuaStageSection} from "../../lib/tools/formats/lua"

  let scene: Scene
  let input: HTMLInputElement

  let jsonInput: HTMLInputElement

  async function jsonFileChange() {
    const file: ConvertedLuaStageSection = JSON.parse(await jsonInput.files[0].text())
    console.log(file)

    for (const polygon of file.SECT_POLYGON[0].slice(0, 1)) {
      for (const points of polygon.GEO.slice(0, 1)) {
        const vertices: Vector3[] = []
        for (let i = 2; i < points.length; i += 3) {
          vertices.push(new Vector3(points[i - 2] / 100, points[i - 1] / 100, points[i] / 100))
        }
        const geometry = new BufferGeometry().setFromPoints(vertices)
        console.log(vertices)
        const material = new LineBasicMaterial({color: Math.random() * 0xff_ff_ff, linewidth: 100})
        const line = new Line(geometry, material)
        scene.add(line)
      }
    }
  }

  async function fileChange() {
    const view = new DataView(await input.files[0].arrayBuffer())

    let vertices = []
    // read xyz values (float32) until the end of the file
    for (let i = 0; i < view.byteLength; i += 4) {
      vertices.push(view.getFloat32(i, true) / 100)
    }
    console.log(vertices.length, vertices.length / 3)

    const geometry = new BufferGeometry()
    geometry.setAttribute("position", new Float32BufferAttribute(vertices, 3))
    const material = new PointsMaterial({color: 0x88_88_88, size: 10, sizeAttenuation: false})
    const points = new Points(geometry, material)
    scene.add(points)
  }

  onMount(async () => {
    scene = new Scene()
    const camera = new PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
    const renderer = new WebGLRenderer()
    document.body.append(renderer.domElement)
    const controls = new OrbitControls(camera, renderer.domElement)
    renderer.setClearColor(0xff_ff_ff)
    renderer.setSize(window.innerWidth, window.innerHeight)
    camera.position.set(0, 20, 100)
    controls.update()

    function animate() {
      requestAnimationFrame(animate)
      controls.update()
      renderer.render(scene, camera)
    }

    animate()
  })
</script>

<input bind:this={input} on:change={fileChange} accept=".bin" type="file" name="filename" />
<input bind:this={jsonInput} on:change={jsonFileChange} accept=".json" type="file" name="filename" />
<p>Path files are just a straight list of little endian float32 3d points, no metadata.</p>
<p>
  Each of the paths in a folder connect, so you can load multiple files at once by selecting them on after
  another
</p>
<p>To clear old results, reload the page</p>
