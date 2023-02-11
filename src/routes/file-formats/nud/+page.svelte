<script lang="ts">
  import {T, Canvas, OrbitControls} from "@threlte/core"
  import {BufferGeometry, DoubleSide, PerspectiveCamera} from "three"
  import {loadNud} from "../../../lib/tools/three-nud"

  let input: HTMLInputElement
  let dragging: boolean
  let wireframe = false
  let camera: PerspectiveCamera
  let controls: OrbitControls

  let cameraPosition = [0, 0, 0]
  let target = [0, 0, 0]

  let geometry: BufferGeometry | undefined
  async function fileChange(files: FileList) {
    const nud = await loadNud(files[0])
    geometry = nud.geometry

    cameraPosition = geometry.boundingSphere.center.addScalar(geometry.boundingSphere.radius * 4).toArray()
    target = geometry.boundingSphere.center.toArray()
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
  on:dragover|preventDefault={() => (dragging = true)}
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
  <label
    >Wireframe
    <input type="checkbox" bind:checked={wireframe} /></label
  >
</div>

{#if geometry}
  {#key geometry}
    <Canvas>
      <T.PerspectiveCamera bind:ref={camera} makeDefault fov={24} position={cameraPosition}>
        <OrbitControls bind:this={controls} autoRotate autoRotateSpeed={0.5} {target} />
      </T.PerspectiveCamera>

      <T.DirectionalLight castShadow position={[3, 10, 10]} />
      <T.AmbientLight intensity={0.2} />

      <T.Mesh {geometry} frustumCulled={false} castShadow receiveShadow>
        <T.MeshPhongMaterial {wireframe} side={DoubleSide} />
      </T.Mesh>
    </Canvas>
  {/key}
{/if}

<style lang="scss">
  input[type="file"] {
    display: none;
  }

  .file-box {
    $drag-box-color: gray;

    position: absolute;
    z-index: -1;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;

    display: flex;

    width: 100vw;
    margin-inline: 0;

    &::after,
    &::before {
      content: "";

      position: absolute;
      top: 0;
      left: 0;

      opacity: 0.5;

      transition: all 120ms ease;
    }

    &::after {
      right: 0;
      bottom: 0;

      margin: 32px;

      background: rgba($drag-box-color, 0.3);
      border-radius: 16px;
      outline: 2px dashed $drag-box-color;
      outline-offset: 16px;
    }

    &::before {
      content: "+";

      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);

      font-size: 10vh;
      color: $drag-box-color;
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
