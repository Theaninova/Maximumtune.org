<script lang="ts">
  import {T, Canvas, OrbitControls, Three, Pass} from "@threlte/core"
  import type {ThrelteContext} from "@threlte/core"
  import {DoubleSide, PerspectiveCamera, Vector2} from "three"
  import {FlyControls} from "three/examples/jsm/controls/FlyControls"
  import type {Model} from "./three-nud"
  import {UnrealBloomPass} from "three/examples/jsm/postprocessing/UnrealBloomPass.js"

  let camera: PerspectiveCamera
  let controls: OrbitControls

  let wireframe = false
  let normal = false
  let autoRotate = false
  let ctx: ThrelteContext
  export let fpsControls = false
  let fov = 24

  let cameraPosition = [-10, -10, -10]
  let target = [0, 0, 0]

  export let models: Promise<Model[]>
  let selectedModel: Model | undefined

  $: {
    models?.then(models => {
      selectedModel = models[0]
      controls?.controls.reset()
      const fovRad = fov * (Math.PI / 180)
      const boundingSphere = models[0].polysets[0].geometry.boundingSphere
      cameraPosition = boundingSphere.center
        .addScalar(boundingSphere.radius * 2 * Math.tan(fovRad * 2) * 1.2)
        .toArray()
      target = boundingSphere.center.toArray()
    })
  }
</script>

<div class="controls">
  <label
    >Wireframe
    <input type="checkbox" bind:checked={wireframe} /></label
  >
  <label>Normals<input type="checkbox" bind:checked={normal} /></label>
  <label>Rotate<input type="checkbox" bind:checked={autoRotate} /></label>
  <label>Fly Controls<input type="checkbox" bind:checked={fpsControls} /></label>
</div>

{#if models}
  {#await models then models}
    <div class="model-list">
      {#each models as model}
        <label>{model.id}<input type="radio" name="model" value={model} bind:group={selectedModel} /></label>
      {/each}
    </div>
  {:catch error}
    <div class="error">
      <h2>Model couldn't be loaded :(</h2>
      <code>{JSON.stringify(error, null, 2)}</code>
    </div>
  {/await}
{/if}

<Canvas bind:ctx>
  <Pass pass={new UnrealBloomPass(new Vector2(1024, 1024), 1.5, 0, 1)} />
  <T.PerspectiveCamera bind:ref={camera} makeDefault {fov} position={cameraPosition} far={1_000_000}>
    {#if !fpsControls}
      <OrbitControls bind:this={controls} {autoRotate} autoRotateSpeed={0.5} {target} />
    {:else}
      <Three type={FlyControls} args={[camera, ctx.renderer.domElement]} autoForward={true} />
    {/if}
  </T.PerspectiveCamera>

  <T.DirectionalLight castShadow position={[3, 10, 10]} />
  <T.AmbientLight intensity={0.2} />

  {#if models}
    {#await models then models}
      {#each models as model}
        <T.Group userData={model.id}>
          {#each model.polysets as polyset}
            <T.Mesh
              geometry={polyset.geometry}
              material={polyset.material}
              material.wireframe={wireframe}
              frustumCulled={false}
              receiveShadow
            />
          {/each}
        </T.Group>
      {/each}
    {/await}
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

  .model-list {
    overflow: scroll;
    display: flex;
  }

  .error {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }

  .controls {
    position: absolute;
    z-index: 100;
    top: 0;
    right: 0;
    left: 0;

    display: flex;
    gap: 4px;
    justify-content: center;

    width: 100vw;
    margin-inline: 0;
    padding: 16px;

    transition: all 120ms ease;
  }

  :global(main) {
    overflow: hidden;
  }
</style>
