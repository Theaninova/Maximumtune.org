<script>
  import Input from "../../lib/components/table/Input.svelte"
  import {Stages} from "../../lib/tools/splits-calculator"
  import {Swiper, SwiperSlide} from "swiper/svelte"
  import {Mousewheel, Navigation, Lazy, Controller} from "swiper"
  import "swiper/css"
  import "swiper/css/effect-fade"
  import "swiper/css/navigation"
  import "swiper/css/lazy"
  import "swiper/css/controller"
  import {onMount} from "svelte"

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
            <div class:active={isActive} class:inactive={!isActive} />
            {#if variation}
              <p>{variation}</p>
            {/if}
          </div>
        </SwiperSlide>
      {/each}
    </Swiper>
  </div>

  <div class="main">
    <Swiper bind:this={mainSwiper} modules={[Navigation, Controller]} navigation={true} style="height: 100%">
      {#each Stages as { sections }}
        <SwiperSlide>
          <form>
            <table>
              {#each Array.from({length: sections}) as _, section}
                <tr>
                  <th>Section {section + 1}</th>
                  <Input type="number" placeholder="0" name="Section {section + 1}" />
                </tr>
              {/each}
            </table>
          </form>
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
  }

  form {
    max-width: 16.5cm;
    margin-inline: auto;

    // center
    display: flex;
    flex-direction: column;
    justify-content: center;
  }

  .container,
  .container > div {
    background-size: contain;
    background-repeat: no-repeat;
    width: 192px;
    aspect-ratio: 1;
  }

  .container {
    background-image: url($course-select);

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

    div {
      background-image: url($course-select-selected);
      z-index: -1;
      filter: invert(91%) sepia(76%) saturate(7247%) hue-rotate(276deg) brightness(180%) contrast(101%);
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
    :global(.swiper-button-next)::after,
    :global(.swiper-button-prev)::after {
      content: "";
      width: 40px;
      aspect-ratio: 1/2;
      // arrow
      clip-path: polygon(0 50%, 100% 0, 100% 20%, 40% 50%, 100% 80%, 100% 100%, 0 50%);
      background: linear-gradient(to right, $color-tertiary, $color-on-tertiary);
    }

    :global(.swiper-button-next)::after {
      transform: rotate(180deg);
    }

    :global(.swiper-button-next),
    :global(.swiper-button-prev) {
      filter: drop-shadow(0 0 6px lighten($color-tertiary-container, 10%));
    }
  }

  .inactive {
    opacity: 0;
  }

  .active {
    animation: active-animation 0.5s ease-in-out infinite alternate-reverse;
  }

  img {
    width: 91.4%;
    height: 91.4%;
  }
</style>
