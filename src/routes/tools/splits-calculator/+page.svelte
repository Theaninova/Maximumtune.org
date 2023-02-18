<script lang="ts">
  import {Stages} from "$lib/tools/splits-calculator"
  import SplitsInput from "$lib/components/table/SplitsInput.svelte"
  import Badge from "$lib/components/Badge.svelte"

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
</script>

<svelte:head>
  <title>Splits Calculator</title>
  <meta name="description" content="Splits Calculator for Wangan Midnight Maximum Tune" />
</svelte:head>

<section>
  <div class="header">
    {#each Stages as stage, i (i)}
      <a class="slide" id="{stage.name}-{stage.variation}" href="#{stage.name}-{stage.variation}">
        <Badge title={stage.name} subtitle={stage.variation} cornerRadius={16} color="#342829">
          <image x="16" y="16" width="224" height="224" href="/map_{stage.imageIndex}.webp" />
        </Badge>
      </a>
      <SplitsInput {stage} />
    {/each}
  </div>

  <div class="main">
    {#each Stages as stage, index (index)}{/each}
  </div>

  <div class="button-bar">
    <button on:click={exportAll}>Export</button>

    <button on:click={importAll}>Import</button>
  </div>
</section>

<style lang="scss">
  @use "sass:color";
  @import "../../../lib/assets/images";
  // stylelint-disable-line order/order
  @import "../../../lib/style/theme";

  @keyframes active-animation {
    0% {
      opacity: 0.1;
    }

    100% {
      opacity: 0.8;
    }
  }

  $card-size: min(192px, calc(100vh - 580px));

  .button-bar {
    display: flex;
    width: 100%;
    height: 48px;
  }

  a + :global(form) {
    position: absolute;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    display: none !important;
  }

  a:target + :global(form) {
    display: flex !important;
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

  section {
    display: flex;
    flex-direction: column;
    flex-grow: 1;

    width: 100%;
    height: 100%;
    margin: 0;
  }

  .container {
    cursor: pointer;

    aspect-ratio: 1;
    width: $card-size;

    background-image: url($course-select);
    background-repeat: no-repeat;
    background-size: contain;

    text {
      font-stretch: extra-condensed;
      filter: drop-shadow(0 0 4px #000);
      fill: white;
    }

    text:first-of-type {
      font-size: 2.6rem;
      font-weight: bold;
    }

    text:last-of-type {
      font-size: 2.2rem;
      font-weight: bold;
      opacity: 0.7;
    }
  }

  swiper-slide {
    will-change: transform;
  }

  .header {
    scroll-behavior: smooth;
    scroll-snap-type: x mandatory;

    overflow-x: auto;
    display: grid;

    height: 256px;
    margin-block: 32px;

    -webkit-overflow-scrolling: touch;

    > * {
      all: unset;

      will-change: transform;
      scroll-snap-align: center;

      display: flex;
      grid-row: 1;

      width: $card-size;

      transition: transform 0.2s ease-in-out;

      &:first-of-type {
        margin-inline-start: 50vw;
      }

      &:last-of-type {
        margin-inline-end: 50vw;
      }

      &:not(:target) {
        transform: scale(0.8);
      }
    }
  }

  .main {
    flex-grow: 1;
  }
</style>
