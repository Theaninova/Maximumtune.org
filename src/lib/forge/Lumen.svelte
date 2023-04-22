<script>
  import {loadLumen} from "./lumen-util.ts"
  import LumenTheatreProject from "$lib/forge/lumen/LumenTheatreProject.svelte"

  export let lumenFile
  export let textureFile

  let canvas

  $: lumen = loadLumen(lumenFile, textureFile, canvas)
</script>

<canvas bind:this={canvas} style="display: none" />

{#if lumen}
  {#await lumen then lumen}
    <!--<p>{lumen.width}x{lumen.height} @ {lumen.framerate}FPS</p>-->
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
    <!-- <LumenTheatre {lumen} /> -->
    <!--<LumenCanvas {lumen} />-->
    <LumenTheatreProject {lumen} />
  {/await}
{/if}
