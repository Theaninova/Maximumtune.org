<script lang="ts">
  import type {LumenSprite} from "./lumen-types.ts"
  import LumenPlacedObject from "$lib/forge/LumenPlacedObject.svelte"

  export let object: LumenSprite
</script>

{#each object.placedObjects as placedObject}
  <LumenPlacedObject {placedObject} />
{/each}
