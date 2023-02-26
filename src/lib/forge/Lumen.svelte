<script>
  import {loadLumen} from "./lumen"
  import LumenCanvas from "$lib/forge/LumenCanvas.svelte"

  export let lumenFile
  export let textureFile

  $: lumen = loadLumen(lumenFile, textureFile)
</script>

{#if lumen}
  {#await lumen then lumen}
    <p>{lumen.width}x{lumen.height} @ {lumen.framerate}FPS</p>
    <!--{#each lumen.lmd.lmb.tags as tag}
      {#if tag.type === Lmd.Tag.TagType.SYMBOLS}
        <div>
          SYMBOLS
          <ul>
            <li />
          </ul>
        </div>
      {:else}
        <div>{Lmd.Tag.TagType[tag.tagType]}</div>
      {/if}
    {/each}-->
    <LumenCanvas {lumen} />
  {/await}
{/if}
