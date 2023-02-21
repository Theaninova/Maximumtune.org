<script lang="ts">
  import {onMount} from "svelte"
  import {page} from "$app/stores"
  import {browser} from "$app/environment"

  export let hashNavigation: string | undefined
  export let slideSize = "256px"
  export let horizontal = false

  onMount(() => {
    if (!hashNavigation) return
    const hash = $page.url.hash || localStorage.getItem(hashNavigation)
    if (hash) {
      document.getElementById(hash.replace(/^#/, "")).scrollIntoView({block: "center"})
    }
  })

  function scroll() {
    if (isDesktop) return

    const height = horizontal ? scrollContainer.offsetWidth : scrollContainer.offsetHeight
    const scrollTop = horizontal ? scrollContainer.scrollLeft : scrollContainer.scrollTop
    const halfHeight = height / 2
    const center = scrollTop + halfHeight

    for (const slide: HTMLAnchorElement of slides) {
      const slideHeight = horizontal ? slide.offsetWidth : slide.offsetHeight
      const centerOffset = center - ((horizontal ? slide.offsetLeft : slide.offsetTop) + slideHeight / 2)
      const centerOffsetAbs = Math.abs(centerOffset)
      const scale = Math.max(Math.min(centerOffsetAbs / height, 1), 0) * -100

      if (hashNavigation) {
        const hash = `#${slide.id}`
        if (scale > -1 && window.location.hash !== hash) {
          history.replaceState(undefined, undefined, hash)
          localStorage.setItem(hashNavigation, hash)
        }
      }

      slide.style.translate = `0px 0px ${Math.round(scale)}px`
    }
  }

  const isDesktop = browser && window.matchMedia("(min-width: 512px)").matches
  let scrollContainer: HTMLDivElement

  $: slides = scrollContainer?.querySelectorAll(":scope > .slider-wrapper > *")
  $: {
    if (slides) scroll()
  }
</script>

<div
  class="slider"
  style:--slide-size={slideSize}
  bind:this={scrollContainer}
  on:scroll={scroll}
  class:row={horizontal}
>
  <div class="slider-wrapper">
    <slot />
  </div>
</div>

<style lang="scss">
  @use "sass:color";
  @import "../style/theme"; // stylelint-disable-line order/order

  .slider-wrapper {
    transform-style: preserve-3d;

    display: grid;
    grid-auto-flow: row;
    // align-items: center;
    // justify-content: center;

    margin-inline: auto;

    > :global(*) {
      will-change: transform;
      scroll-snap-align: center;

      display: flex;
      align-items: center;
      justify-content: center;

      width: var(--slide-size);
      height: var(--slide-size);
    }

    @media (max-width: 512px) {
      &::after,
      &::before {
        content: "";
        display: block;
        width: var(--slide-size);
        height: 50vh;
      }
    }
  }

  .slider {
    position: relative;
    overflow-x: hidden;
    overflow-y: auto;

    &.row {
      overflow-x: auto;
      overflow-y: hidden;

      > .slider-wrapper {
        grid-auto-flow: column;

        @media (max-width: 512px) {
          &::after,
          &::before {
            width: 50vw;
            height: var(--slide-size);
          }
        }
      }
    }

    @media (max-width: 512px) {
      scroll-snap-type: both mandatory;
      scroll-snap-stop: normal;
      perspective: 200px;
    }
  }
</style>
