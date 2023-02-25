<script lang="ts">
  import {Stages} from "$lib/tools/splits-calculator"
  import Meta from "$lib/components/page/Meta.svelte"
  import StageBadge from "$lib/components/tools/splits/StageBadge.svelte"
  import {page} from "$app/stores"
  import {onMount} from "svelte"
  import {browser} from "$app/environment"

  const exportAll = () => {
    const out = {}
    for (const {key} of Stages) {
      out[key] = JSON.parse(localStorage.getItem(key))
    }

    // download json
    const element = document.createElement("a")
    const file = new Blob([JSON.stringify(out)], {type: "text/plain"})
    element.href = URL.createObjectURL(file)
    element.download = `splits_${new Date(Date.now()).toLocaleString()}.json`
    element.click()
  }

  const importAll = () => {
    const input = document.createElement("input")
    input.type = "file"
    input.accept = ".json"
    input.addEventListener("change", () => {
      const file = input.files[0]
      const reader = new FileReader()
      reader.addEventListener("load", () => {
        if (typeof reader.result !== "string") return
        const data = JSON.parse(reader.result)
        for (const {key} of Stages) {
          localStorage.setItem(key, JSON.stringify(data[key]))
        }
        window.location.reload()
      })
      reader.readAsText(file)
    })
    input.click()
  }

  onMount(() => {
    const hash = $page.url.hash || localStorage.getItem("splits_stage")
    if (hash) {
      document.getElementById(hash.replace(/^#/, ""))?.scrollIntoView({block: "center"})
    }
  })

  function scroll() {
    if (isDesktop) return

    const height = scrollContainer.offsetHeight
    const scrollTop = scrollContainer.scrollTop
    const halfHeight = height / 2
    const center = scrollTop + halfHeight

    for (const slide: HTMLAnchorElement of slides) {
      const slideChild = slide.firstChild as HTMLElement
      const slideHeight = slide.offsetHeight
      const centerOffset = center - (slide.offsetTop + slideHeight / 2)
      const centerOffsetAbs = Math.abs(centerOffset)
      const scale = Math.max(Math.min(centerOffsetAbs / height, 1), 0) * -100

      const hash = `#${slideChild.id}`
      if (scale > -1 && window.location.hash !== hash) {
        history.replaceState(undefined, undefined, hash)
        localStorage.setItem("splits_stage", hash)
      }

      slideChild.style.translate = `0px 0px ${Math.round(scale)}px`
    }
  }

  export let data

  const isDesktop = browser && window.matchMedia("(min-width: 512px)").matches
  let scrollContainer: HTMLDivElement
  $: slides = scrollContainer?.querySelectorAll(":scope > * > *")
  $: {
    if (slides) {
      scroll()
    }
  }
</script>

<Meta title="Splits Calculator" />

<section bind:this={scrollContainer} on:scroll={scroll}>
  <div class="header">
    {#each data.stages as stage}
      <div class="slide">
        <a id={stage.key} href="./{stage.key}/" aria-label={stage.title}>
          <StageBadge {stage} />
        </a>
      </div>
    {/each}
  </div>
</section>

<div class="button-bar">
  <button on:click={exportAll}>Export</button>

  <button on:click={importAll}>Import</button>
</div>

<style lang="scss">
  @use "sass:color";
  @import "../../../../lib/style/theme"; // stylelint-disable-line order/order

  $card-size: 256px;

  .button-bar {
    position: absolute;
    bottom: 16px;
    left: 0;

    display: flex;
    flex-direction: column;
    gap: 8px;

    width: min-content;
    height: 48px;
    margin: 8px;
  }

  button {
    all: unset;

    cursor: pointer;

    height: 20px;
    margin-block: auto;
    margin-inline: 4px;
    padding: 2px 6px 6px;

    background: $black-3d-panel;
    filter: drop-shadow(0 0 4px black);
    border: none;
    border-radius: 4px;
  }

  .slide {
    cursor: pointer;
    scroll-snap-align: center;

    transform-style: preserve-3d;

    contain: size layout;
    display: flex;
    align-items: center;
    justify-content: center;

    width: $card-size;
    height: $card-size;
  }

  section {
    position: relative;

    overflow-x: hidden;
    overflow-y: auto;

    width: 100%;
    margin-block-start: -68px;
    margin-inline: 0;

    @media (max-width: 512px) {
      scroll-snap-type: y mandatory;
      scroll-snap-stop: normal;
      perspective: 200px;
    }
  }

  .header {
    transform-style: preserve-3d;

    display: grid;
    grid-template-columns: repeat(auto-fit, $card-size);
    justify-content: center;

    max-width: 30cm;
    height: 100%;
    margin-inline: auto;

    @media (max-width: 512px) {
      &::after,
      &::before {
        content: "";
        height: 50vh;
      }
    }
  }
</style>
