<script lang="ts">
  import type {Lumen} from "../lumen.ts"
  import {onMount} from "svelte"
  import studio from "@theatre/studio"
  import {types, getProject} from "@theatre/core"

  export let lumen: Lumen

  onMount(() => {
    studio.initialize()

    const project = getProject("Lumen")

    for (const entry of Object.values(lumen.defines)) {
      const sheet = project.sheet(entry.id.toString())
      sheet.object("Test2", {
        position: types.compound({
          x: types.number(0),
          y: types.number(0),
        }),
        transform: types.compound({
          x: types.number(0),
          y: types.number(0),
          rotate: types.number(0),
          scaleX: types.number(0),
          scaleY: types.number(0),
        }),
      })
    }
  })
</script>

<svg viewBox="0 0 {lumen.width} {lumen.height}">
  <defs />
</svg>
