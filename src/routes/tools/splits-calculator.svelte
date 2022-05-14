<script>
  import {Stages} from "../../lib/tools/splits-calculator"
  import {Swiper, SwiperSlide} from "swiper/svelte"
  import {Mousewheel, Navigation, Lazy, Controller} from "swiper"
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
</script>

<svelte:head>
  <title>Splits Calculator</title>
  <meta name="description" content="Splits Calculator for Wangan Midnight Maximum Tune" />
</svelte:head>

<div class="subtitle">
  <h1>Splits Calculator</h1>
</div>

<section>
  <div class="header">
    <Swiper
      bind:this={headerSwiper}
      modules={[Mousewheel, Lazy, Controller]}
      mousewheel
      slidesPerView={"auto"}
      centeredSlides={true}
      lazy={true}
    >
      {#each Stages as { name, variation, imageIndex, sections }, i}
        <SwiperSlide let:data={{isActive}}>
          <div
            class:activeSlide={!isActive}
            class="container"
            on:click={() => mainSwiper.swiper().slideTo(i)}
          >
            <p>{name}</p>
            <img src="/map_{imageIndex}.webp" alt="TODO" class="swiper-lazy" />
            {#if variation}
              <p>{variation}</p>
            {/if}
          </div>
        </SwiperSlide>
      {/each}
    </Swiper>
  </div>

  <div class="main">
    <Swiper
      bind:this={mainSwiper}
      modules={[Mousewheel, Navigation, Controller]}
      navigation={true}
      mousewheel
    >
      {#each Stages as stage}
        <SwiperSlide>
          <SplitsInput {stage} />
        </SwiperSlide>
      {/each}
    </Swiper>
    <form />
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

  section {
    width: 100%;
    height: 100%;
    flex-grow: 1;
    display: flex;
    flex-direction: column;
  }

  .container {
    background-image: url($course-select);
    background-size: contain;
    background-repeat: no-repeat;
    width: 192px;
    aspect-ratio: 1;

    cursor: pointer;

    // center
    display: grid;
    place-items: center;
    justify-items: center;
    align-items: center;

    > * {
      grid-column: 1;
      grid-row: 1;
    }

    p {
      position: absolute;
      font-stretch: extra-condensed;

      text-align: center;
      text-shadow: 0 0 4px #000;
    }
    p:first-child {
      top: -15px;
      font-weight: bold;
      font-size: 1.8rem;
    }
    p:last-child {
      opacity: 0.7;
      bottom: 0;
      font-weight: bold;
      font-size: 1.4rem;
    }

    img {
      width: calc(100% * (256 / 280));
      aspect-ratio: 1;
    }
  }

  .header {
    margin-block: 32px;

    :global(.swiper-slide) {
      transition: transform 0.2s ease-in-out;
      width: 192px;
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

    :global(.swiper-button-next),
    :global(.swiper-button-prev) {
      filter: drop-shadow(0 0 4px lighten($color-tertiary-container, 20%));
    }

    @media (max-width: 768px) {
      :global(.swiper-button-next),
      :global(.swiper-button-prev) {
        display: none;
      }
    }
  }

  img {
    width: 91.4%;
    height: 91.4%;
  }
</style>
