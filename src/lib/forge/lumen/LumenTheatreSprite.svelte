<script lang="ts">
  import type {LumenShape, LumenSprite} from "../lumen-types"
  import type {IProject} from "@theatre/core"
  import {types} from "@theatre/core"
  import TheatreSheetObject from "$lib/forge/lumen/TheatreSheetObject.svelte"

  export let project: IProject
  export let define: LumenSprite | LumenShape

  $: sheet = project.sheet(define.id.toString())
  // $: {
  // if (define.type === "shape") {
  //   let i = 0
  //   for (const graphic of define.graphics) {
  //     const object = sheet.object(`graphic-${i}`, {
  //       x: types.number(graphic.x),
  //       y: types.number(graphic.y),
  //       width: types.number(graphic.width),
  //       height: types.number(graphic.height),
  //       texture: types.image(graphic.texture.dataUrl, {label: graphic.texture.name}),
  //     })
  //     object.onValuesChange(values => {})
  //
  //     i++
  //   }
  // }
  // }
</script>

<g id={define.id}>
  {#if define.type === "shape"}
    {#each define.graphics as graphic, i}
      <TheatreSheetObject
        {sheet}
        key="graphic-{i}"
        props={{
          x: types.number(graphic.x),
          y: types.number(graphic.y),
          width: types.number(graphic.width),
          height: types.number(graphic.height),
          texture: types.image(graphic.texture.dataUrl),
        }}
        let:x
        let:y
        let:height
        let:width
        let:texture
      >
        <image {x} {y} {width} {height} href="data:image/{texture.id}" />
      </TheatreSheetObject>
    {/each}
  {/if}
</g>
