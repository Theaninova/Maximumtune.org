<script lang="ts">
  import {T, Canvas, OrbitControls} from "@threlte/core"
  import Nud from "$lib/tools/kaitai/nud.ksy"
  import {BufferGeometry, Float32BufferAttribute, Uint16BufferAttribute, Uint8BufferAttribute} from "three"

  let input: HTMLInputElement
  let dragging: boolean

  let geometry: BufferGeometry | undefined

  function getRenderingVertexIndices(vertexIndices: number[]): number[] {
    let renderingIndices: number[] = []

    let startDirection = 1
    let p = 0
    let f1 = vertexIndices[p++]
    let f2 = vertexIndices[p++]
    let faceDirection = startDirection
    let f3
    do {
      f3 = vertexIndices[p++]
      if (f3 === 0xff_ff) {
        f1 = vertexIndices[p++]
        f2 = vertexIndices[p++]
        faceDirection = startDirection
      } else {
        faceDirection *= -1
        if (f1 !== f2 && f2 !== f3 && f3 !== f1) {
          if (faceDirection > 0) {
            renderingIndices.push(f3, f2, f1)
          } else {
            renderingIndices.push(f2, f3, f1)
          }
        }
        f1 = f2
        f2 = f3
      }
    } while (p < vertexIndices.length)

    // this.displayFaceSize = renderingIndices.length;
    return renderingIndices
  }

  async function fileChange(files: FileList) {
    for (const file of files) {
      const nud = new Nud(await file.arrayBuffer())
      const vertexData = nud.polyData[0].vertices

      const vertices = vertexData.map(it => it.vertex.values)
      const indices = getRenderingVertexIndices(nud.polyData[0].indices)
      // const uvs = vertexData.map(it => it.uvChannels[0].values)
      const colors = vertexData.map(it => it.colors.values)

      geometry = new BufferGeometry()
      geometry.index = new Uint16BufferAttribute(indices, 1)
      geometry.setAttribute("position", new Float32BufferAttribute(vertices.flat(), vertices[0].length))
      // geometry.setAttribute("uv", new Float32BufferAttribute(uvs.flat(), uvs[0].length))
      geometry.setAttribute("color", new Uint8BufferAttribute(colors.flat(), colors[0].length))
    }
  }
</script>

<svelte:window
  on:dragenter={() => (dragging = true)}
  on:dragleave={() => (dragging = false)}
  on:dragend={() => (dragging = false)}
  on:drop|preventDefault={event => {
    dragging = false
    fileChange(event.dataTransfer.files)
  }}
  on:dragover|preventDefault={() => false}
/>

<div class="file-box" class:dragging class:has-content={!!geometry}>
  <input
    bind:this={input}
    on:change={() => fileChange(input.files)}
    accept=".nud"
    type="file"
    name="filename"
    multiple
  />
</div>

<Canvas>
  <T.PerspectiveCamera makeDefault position={[10, 10, 10]} fov={24}>
    <OrbitControls />
  </T.PerspectiveCamera>

  <T.DirectionalLight castShadow position={[3, 10, 10]} />
  <T.DirectionalLight position={[-3, 10, -10]} intensity={0.2} />
  <T.AmbientLight intensity={0.2} />

  {#if geometry}
    <T.Mesh {geometry}>
      <T.MeshBasicMaterial wireframe={false} />
    </T.Mesh>
  {/if}
</Canvas>

<style lang="scss">
  input {
    display: none;
  }

  .file-box {
    display: flex;
    margin-inline: 0;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    width: 100vw;
    z-index: -1;

    $drag-box-color: gray;

    &::after,
    &::before {
      content: "";
      position: absolute;
      opacity: 0.5;
      top: 0;
      left: 0;
      transition: all 120ms ease;
    }

    &::after {
      margin: 32px;

      right: 0;
      bottom: 0;
      border-radius: 16px;
      outline: 2px dashed $drag-box-color;
      outline-offset: 16px;

      background: rgba($drag-box-color, 0.3);
    }

    &::before {
      content: "+";

      top: 50%;
      left: 50%;
      color: $drag-box-color;
      font-size: 10vh;
      transform: translate(-50%, -50%);
    }

    &.has-content::before,
    &.has-content::after {
      opacity: 0;
    }

    &.dragging::before,
    &.dragging::after {
      opacity: 1;
    }
  }

  :global(main) {
    overflow: hidden;
  }
</style>
