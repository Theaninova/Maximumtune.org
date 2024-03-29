<!-- @hmr:keep-all -->
<script lang="ts">
  import type {Lumen} from "./lumen.ts"
  import {Lmd} from "./kaitai/compiled/lmd"
  import {onMount} from "svelte"
  import LumenSprite from "$lib/forge/LumenSprite.svelte"

  export let lumen: Lumen

  let nextAnimationFrame: any
  let animationStart = 0
  let lastFrameIndex = -1

  onMount(() => {
    lumen.renderTextures(renderCanvas)
    ready = true
    // play()
  })

  export function play() {
    lastFrameIndex = -1
    animationStart = performance.now()
    resume()
  }

  export function pause() {
    cancelAnimationFrame(nextAnimationFrame)
  }

  export function resume() {
    pause()
    requestAnimationFrame(() => renderLoop())
  }

  function renderLoop() {
    const elapsed = performance.now() - animationStart
    const frameIndex = Math.round((elapsed / 1000) * lumen.framerate) % lumen.frames.length
    if (lastFrameIndex !== frameIndex) {
      renderFrame(frameIndex)
      lastFrameIndex = frameIndex
    }
    requestAnimationFrame(() => renderLoop())
  }

  function renderFrame(index: number) {
    const frame = lumen.frames[index]

    for (const action: Lmd.Tag of frame) {
      switch (action.tagType) {
        case Lmd.Tag.TagType.PLACE_OBJECT: {
          const data = action.data as Lmd.PlaceObject
          // const move = data.placementMode === Lmd.PlaceObject.PlacementMode.MOVE

          depthStack[data.depth] ||= {}
          const previousObject = depthStack[data.depth][data.characterId] || {
            refId: data.characterId,
            depth: data.depth,
          }

          const position = lumen.positions[data.positionId]
          if (position) {
            previousObject.x = position.x
            previousObject.y = position.y
          }
          const transform = lumen.transforms[data.positionFlags]
          if (transform) {
            previousObject.transform = transform
          }

          depthStack[data.depth][data.characterId] = previousObject
        }
      }
    }

    items = Object.values(depthStack).flatMap(it => Object.values(it))
  }

  let depthStack: Record<
    number,
    Record<number, {depth: number; refId: number; transform?: string; x?: number; y?: number}>
  > = {}
  let items: any[] = []

  let ready = false
  let lumenCanvas: SVGElement
  let renderCanvas: HTMLCanvasElement
</script>

<div {...$$restProps} class="lumen-canvas">
  {#if ready}
    <svg
      bind:this={lumenCanvas}
      viewBox="{(0 * -lumen.width) / 2} {(0 * -lumen.height) / 2} {lumen.width} {lumen.height}"
    >
      <LumenSprite object={lumen.entry} />
    </svg>
  {/if}
  <canvas bind:this={renderCanvas} class="render-canvas" />
</div>

<style lang="scss">
  .lumen-canvas {
    width: 80%;
    height: 80%;

    svg {
      border: 2px solid black;
      overflow: visible;

      * {
        transform-box: fill-box;
        transform-origin: center;
      }
    }
  }

  .render-canvas {
    display: none;
  }
</style>
