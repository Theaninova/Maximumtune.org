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
      {#each Stages as { sections }}
        <SwiperSlide>
          <form>
            <div class="table">
              <em class="green">Personal Best</em>
              <div>02' 57" 216</div>
              <em class="purple">Theory Time</em>
              <div>02' 57" 216</div>
              <em class="orange">Difference</em>
              <div>02' 57" 216</div>
              <hr />
              <hr />
              {#each Array.from({length: sections}) as _, section}
                <div>Section {section + 1}</div>
                <div>00' 47" 000</div>
              {/each}
              <hr />
              <hr />
              <em class="grey">Total Time</em>
              <div>02' 57" 216</div>
            </div>
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

  .table {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-gap: 4px 0;
    align-items: center;
    justify-items: center;

    > * {
      font-weight: bold;
      font-style: italic;
      text-shadow: 0 0 4px black;
      text-transform: uppercase;
      letter-spacing: 1.5px;
    }

    > div {
      font-size: 20px;
    }
  }

  .table > hr {
    width: 100%;
    height: 1px;
    background: $color-outline;
    margin-block: 16px;
    box-shadow: unset;
  }

  em {
    height: 28px;
    width: 192px;
    border-radius: 14px;

    display: flex;
    justify-content: center;
    align-items: center;

    box-shadow: 0 0 2px black inset;
  }

  .orange {
    background: #934b00 $shine-3d;
  }
  .green {
    background: #0a5a0c $shine-3d;
  }
  .purple {
    background: #502f8a $shine-3d;
  }
  .grey {
    background: #484546 $shine-3d;
  }

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

  form {
    max-width: 16.5cm;
    height: 100%;
    margin: auto;

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
