<script lang="ts">
  import type {LumenPlacedObject} from "./lumen-types.ts"
  import LumenSprite from "$lib/forge/LumenSprite.svelte"
  import LumenShape from "$lib/forge/LumenShape.svelte"
  import LumenAnimation from "$lib/forge/LumenAnimation.svelte"

  export let placedObject: LumenPlacedObject
</script>

<g>
  {#if placedObject.object?.type === "sprite"}
    <LumenSprite object={placedObject.object} />
  {:else if placedObject.object?.type === "shape"}
    <LumenShape object={placedObject.object} />
  {/if}

  {#each placedObject.animations as animation}
    <LumenAnimation {animation} />
  {/each}
</g>
