<script lang="ts">
  // throw new Error("@migration task: Add data prop (https://github.com/sveltejs/kit/discussions/5774#discussioncomment-3292707)");
  import {swiper} from "$lib/components/swiper"
  import {Stages} from "$lib/tools/splits-calculator"
  import SplitsInput from "$lib/components/table/SplitsInput.svelte"
  import type Swiper from "swiper"

  let mainSwiper: {swiper: Swiper}

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
    <swiper-container
      bind:this={mainSwiper}
      use:swiper
      mousewheel
      slides-per-view="auto"
      centered-slides={true}
      lazy={true}
      controller-control=".main-swiper"
      class="header-swiper"
    >
      {#each Stages as { name, variation, imageIndex, sections }, i}
        <swiper-slide>
          <svg viewBox="0 0 280 280" class="container" on:click={() => mainSwiper.swiper.slideTo(i)}>
            <text x="140" y="63" text-anchor="middle">{name}</text>
            <image x="12" y="12" width="256" height="256" href="/map_{imageIndex}.webp" />
            {#if variation}
              <text x="140" y="239" text-anchor="middle">{variation}</text>
            {/if}
          </svg>
        </swiper-slide>
      {/each}
    </swiper-container>
  </div>

  <div class="main">
    <swiper-container
      use:swiper
      navigation={true}
      mousewheel
      virtual={true}
      controller-control=".header-swiper"
      class="main-swiper"
    >
      {#each Stages as stage, index (index)}
        <swiper-slide>
          <SplitsInput {stage} />
        </swiper-slide>
      {/each}
    </swiper-container>
    <form />
  </div>

  <div class="button-bar">
    <button on:click={exportAll}>Export</button>

    <button on:click={importAll}>Import</button>
  </div>
</section>

<style lang="scss">
  @use "sass:color";
  @import "../../../lib/assets/images"; // stylelint-disable-line order/order
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
    background: $black-3d-panel;
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

    text:first-child {
      font-size: 2.6rem;
      font-weight: bold;
    }

    text:last-child {
      font-size: 2.2rem;
      font-weight: bold;
      opacity: 0.7;
    }
  }

  swiper-slide {
    will-change: transform;
  }

  .header {
    margin-block: 32px;

    swiper-slide {
      will-change: transform;
      width: $card-size;
      transition: transform 0.2s ease-in-out;
    }

    swiper-slide:not(.swiper-slide-active) {
      transform: scale(0.8);
    }
  }

  .main {
    flex-grow: 1;

    swiper-container::part(button-next)::after,
    swiper-container::part(button-prev)::after {
      content: "";

      aspect-ratio: 1/2;
      height: 32px;

      background: linear-gradient(to right, $color-tertiary, $color-on-tertiary);

      // arrow
      clip-path: polygon(0 50%, 100% 0, 100% 25%, 50% 50%, 100% 75%, 100% 100%, 0 50%);
    }

    swiper-container::part(button-next)::after {
      transform: rotate(180deg);
    }

    swiper-container::part(button-next),
    swiper-container::part(button-prev) {
      will-change: opacity;
      filter: drop-shadow(0 0 4px color.adjust($color-tertiary-container, $lightness: 20%));
    }

    @media (max-width: 768px) {
      swiper-container::part(button-next),
      swiper-container::part(button-prev) {
        display: none;
      }
    }
  }
</style>
