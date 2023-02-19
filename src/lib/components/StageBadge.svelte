<script lang="ts">
  import type {Stage} from "../tools/splits-calculator"
  import Background from "$lib/assets/course-select.webp"

  export let stage: Stage
</script>

<svg
  viewBox="0 0 256 256"
  width="100%"
  height="100%"
  xmlns="http://www.w3.org/2000/svg"
  style:background-image="url('{Background}')"
>
  <defs>
    <linearGradient id="text-fill" gradientTransform="rotate(90)">
      <stop offset="0%" stop-color="#d9d9d9" />
      <stop offset="49%" stop-color="white" />
      <stop offset="50%" stop-color="#d9d9d9" />
      <stop offset="100%" stop-color="#d9d9d9" />
    </linearGradient>
  </defs>
  <image x="16" y="16" width="224" height="224" href="/map_{stage.imageIndex}.webp" />

  <text x="128" y="60" text-anchor="middle" font-size="32" fill="url(#text-fill)">
    {stage.name}
  </text>
  {#if stage.variation}
    <text x="128" y="195" dy="24" text-anchor="middle" font-size="24" fill="url(#text-fill)">
      {stage.variation}
    </text>
  {/if}
</svg>

<style lang="scss">
  @import "../style/theme";

  text {
    font-family: "Roboto Flex", Roboto, sans-serif;
    font-weight: bolder;
    text-transform: uppercase;
    filter: drop-shadow(0 0 1px black) drop-shadow(0 0 1px black);
  }

  svg {
    @include hover {
      scale: 1.1;
    }

    will-change: transform;

    overflow: hidden;

    aspect-ratio: 1;
    max-width: 256px;

    background-repeat: no-repeat;
    background-position: center;
    background-size: contain;

    transition: scale 200ms $mt-interpolation;
  }
</style>
