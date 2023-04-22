<script lang="ts">
  import type {Lumen} from "../lumen.ts"
  import studio from "@theatre/studio"
  import {getProject} from "@theatre/core"
  import LumenTheatreSprite from "./LumenTheatreSprite.svelte"

  studio.initialize()

  export let lumen: Lumen
  const project = getProject("Lumen", {
    assets: {
      baseUrl: "data:image/",
    },
  })
</script>

<svg viewBox="0 0 {lumen.width} {lumen.height}">
  <defs>
    {#each Object.values(lumen.defines) as define}
      <LumenTheatreSprite {define} {project} />
    {/each}
  </defs>
  <use href="url(#{lumen.entry.id})" />
</svg>
