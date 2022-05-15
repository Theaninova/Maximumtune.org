<script>
  import {Stages} from "../../lib/tools/splits-calculator"
  import {Swiper, SwiperSlide} from "swiper/svelte"
  import {Mousewheel, Navigation, Controller, Virtual} from "swiper"
  import "swiper/css"
  import "swiper/css/effect-fade"
  import "swiper/css/navigation"
  import "swiper/css/lazy"
  import "swiper/css/controller"
  import {onMount} from "svelte"
  import SplitsInput from "../../lib/components/table/SplitsInput.svelte"

  let headerSwiper
  let mainSwiper

  onMount(() => {
    mainSwiper.swiper().controller.control = headerSwiper.swiper()
    headerSwiper.swiper().controller.control = mainSwiper.swiper()
  })

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
    <Swiper
      bind:this={headerSwiper}
      modules={[Mousewheel, Controller]}
      mousewheel
      slidesPerView={"auto"}
      centeredSlides={true}
      lazy={true}
    >
      {#each Stages as { name, variation, imageIndex, sections }, i}
        <SwiperSlide>
          <svg viewBox="0 0 280 280" class="container" on:click={() => mainSwiper.swiper().slideTo(i)}>
            <text x="140" y="63" text-anchor="middle">{name}</text>
            <image x="12" y="12" width="256" height="256" href="/map_{imageIndex}.webp" />
            {#if variation}
              <text x="140" y="239" text-anchor="middle">{variation}</text>
            {/if}
          </svg>
        </SwiperSlide>
      {/each}
    </Swiper>
  </div>

  <div class="main">
    <Swiper
      bind:this={mainSwiper}
      modules={[Mousewheel, Navigation, Controller, Virtual]}
      navigation={true}
      mousewheel
      virtual={{slides: Stages}}
      let:virtualData={{slides, offset, from}}
    >
      {#each slides as stage, index (from + index)}
        <SwiperSlide virtualIndex={from + index} style="left: {offset}px">
          <SplitsInput {stage} />
        </SwiperSlide>
      {/each}
    </Swiper>
    <form />
  </div>

  <div class="button-bar">
    <ul class="button-group">
      <li>
        <button on:click={exportAll}>Export</button>
      </li>
      <li>
        <button on:click={importAll}>Import</button>
      </li>
    </ul>
  </div>
</section>

<style lang="scss">
  @import "../../lib/assets/images";
  @import "../../lib/style/theme";

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
    width: 100%;
    height: 48px;
    background: $black-3d-panel;
    display: flex;

    > ul {
      margin-block: auto;
      max-width: $content-width;
    }
  }

  button {
    border: none;
  }

  section {
    width: 100%;
    height: 100%;
    margin: 0;
    flex-grow: 1;
    display: flex;
    flex-direction: column;
  }

  .container {
    background-image: url($course-select);
    background-size: contain;
    background-repeat: no-repeat;
    width: $card-size;
    aspect-ratio: 1;

    cursor: pointer;

    text {
      font-stretch: extra-condensed;
      fill: white;
      filter: drop-shadow(0 0 4px #000);
    }
    text:first-child {
      font-weight: bold;
      font-size: 2.6rem;
    }
    text:last-child {
      opacity: 0.7;
      font-weight: bold;
      font-size: 2.2rem;
    }
  }

  .header {
    margin-block: 32px;

    :global(.swiper-slide) {
      transition: transform 0.2s ease-in-out;
      width: $card-size;
      will-change: transform;
    }

    :global(.swiper-slide):not(.swiper-slide-active) {
      transform: scale(0.8);
    }
  }

  .main {
    flex-grow: 1;

    :global(.swiper-button-next)::after,
    :global(.swiper-button-prev)::after {
      content: "";
      height: 32px;
      aspect-ratio: 1/2;
      // arrow
      clip-path: polygon(0 50%, 100% 0, 100% 25%, 50% 50%, 100% 75%, 100% 100%, 0 50%);
      background: linear-gradient(to right, $color-tertiary, $color-on-tertiary);
    }

    :global(.swiper-button-next)::after {
      transform: rotate(180deg);
    }

    :global(.swiper-slide) {
      will-change: transform;
    }

    :global(.swiper-button-next),
    :global(.swiper-button-prev) {
      will-change: opacity;
      filter: drop-shadow(0 0 4px lighten($color-tertiary-container, 20%));
    }

    @media (max-width: 768px) {
      :global(.swiper-button-next),
      :global(.swiper-button-prev) {
        display: none;
      }
    }
  }
</style>
