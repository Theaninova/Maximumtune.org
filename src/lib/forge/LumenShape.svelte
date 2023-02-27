<script lang="ts">
  import type {LumenShape} from "./lumen-types.ts"

  export let object: LumenShape
</script>

{#each object.graphics as { x, y, width, height, texture }}
  {#if texture}
    <image href={texture.dataUrl} {x} {y} {width} {height} />
  {/if}
{/each}
