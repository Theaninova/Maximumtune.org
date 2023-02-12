<script lang="ts">
  import {T, Canvas, OrbitControls} from "@threlte/core"
  import {DoubleSide, PerspectiveCamera} from "three"
  import {loadNud} from "../../../lib/tools/three-nud"
  import type {Model} from "../../../lib/tools/three-nud"

  let input: HTMLInputElement
  let dragging: boolean
  let camera: PerspectiveCamera
  let controls: OrbitControls

  let wireframe = false
  let normal = false
  let autoRotate = true

  let cameraPosition = [0, 0, 0]
  let target = [0, 0, 0]

  let models: Model[]
  let selectedModel: Model

  async function fileChange(files: FileList) {
    models = await loadNud(files[0])
    selectedModel = models[0]
  }

  $: {
    if (models) {
      controls.controls.reset()
      const fov = camera.fov * (Math.PI / 180)
      cameraPosition = models[0].geometry[0].boundingSphere.center
        .addScalar(models[0].geometry[0].boundingSphere.radius * 2 * Math.tan(fov * 2) * 1.2)
        .toArray()
      target = models[0].geometry[0].boundingSphere.center.toArray()
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
  on:dragover|preventDefault={() => (dragging = true)}
/>

<div class="controls">
  <label
    >Wireframe
    <input type="checkbox" bind:checked={wireframe} /></label
  >
  <label>Normals<input type="checkbox" bind:checked={normal} /></label>
  <label>Rotate<input type="checkbox" bind:checked={autoRotate} /></label>
  {#if models}
    <div class="model-list">
      {#each models as model}
        <label>{model.id}<input type="radio" name="model" value={model} bind:group={selectedModel} /></label>
      {/each}
    </div>
  {/if}
</div>
<div class="file-box" class:dragging class:has-content={!!selectedModel}>
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
  <T.PerspectiveCamera bind:ref={camera} makeDefault fov={24} position={cameraPosition}>
    <OrbitControls bind:this={controls} {autoRotate} autoRotateSpeed={0.5} {target} />
  </T.PerspectiveCamera>

  <T.DirectionalLight castShadow position={[3, 10, 10]} />
  <T.AmbientLight intensity={0.2} />

  {#if models}
    {#each models as model}
      {#each model.geometry as geometry}
        <T.Mesh {geometry} frustumCulled={false} receiveShadow>
          {#if normal && model !== selectedModel}
            <T.MeshNormalMaterial {wireframe} side={DoubleSide} />
          {:else}
            <T.MeshStandardMaterial
              color={model === selectedModel ? "red" : "white"}
              {wireframe}
              side={DoubleSide}
            />
          {/if}
        </T.Mesh>
      {/each}
    {/each}
  {/if}
</Canvas>

<style lang="scss">
  label:has(input) {
    display: flex;
    align-items: center;
    justify-content: center;

    height: 32px;
    padding-inline: 8px;

    border: 1px solid white;

    &:has(:checked) {
      color: black;
      background: white;
    }

    :not(label + &) {
      padding-inline-start: 16px;
      border-radius: 16px 0 0 16px;
    }

    :not(&:has(+ label)) {
      padding-inline-end: 16px;
      border-radius: 0 16px 16px 0;
    }

    > input {
      display: none;
    }
  }

  input[type="file"] {
    display: none;
  }

  .model-list {
    display: flex;
    overflow: scroll;
  }

  .controls,
  .file-box {
    position: absolute;
    top: 0;
    right: 0;
    left: 0;

    display: flex;

    width: 100vw;
    margin-inline: 0;
  }

  .controls {
    gap: 4px;
    padding: 16px;
    opacity: 0;
    transition: all 120ms ease;

    &:has(+ .has-content:not(.dragging)):not(:has(+ .dragging)) {
      opacity: 1;
    }
  }

  .file-box {
    $drag-box-color: gray;

    z-index: -1;
    bottom: 0;

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
