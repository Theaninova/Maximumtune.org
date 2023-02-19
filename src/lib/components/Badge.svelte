<script lang="ts">
  export let href: string
  export let color = ""
  export let title = "Battle"
  export let subtitle = "Grade"
</script>

<a {href}>
  <svg
    width="100%"
    height="100%"
    viewBox="0 0 256 256"
    xmlns="http://www.w3.org/2000/svg"
    class:no-color={color !== "red"}
  >
    <defs>
      <linearGradient id="text-fill" gradientTransform="rotate(90)">
        <stop offset="0%" stop-color="#d9d9d9" />
        <stop offset="49%" stop-color="white" />
        <stop offset="50%" stop-color="#d9d9d9" />
        <stop offset="100%" stop-color="#d9d9d9" />
      </linearGradient>
    </defs>
    <text x="128" y="92" text-anchor="middle" font-size="42" fill="url(#text-fill)">
      {title}
    </text>
    {#if subtitle}
      <text x="128" y="92" dy="24" text-anchor="middle" font-size="22" fill="url(#text-fill)">
        {subtitle}
      </text>
    {/if}
    <slot />
  </svg>
</a>

<style lang="scss">
  @import "../style/theme";

  a {
    all: unset;

    will-change: transform;
    cursor: pointer;

    transform: scale(1);

    aspect-ratio: 1;

    transition: transform 0.2s $mt-interpolation;

    @include hover {
      transform: scale(1.1);
    }
  }

  svg {
    will-change: transform;
    // background: url("$lib/assets/battle-grade-button.webp") no-repeat center;
    background: url("$lib/assets/badge/badge-round.svg") no-repeat center;
  }

  svg.no-color {
    filter: hue-rotate(12deg) contrast(120%) saturate(20%);
  }

  a > svg > text {
    font-family: "Roboto Flex", Roboto, sans-serif;
    font-weight: bolder;
    text-transform: uppercase;
    filter: drop-shadow(0 0 1px black) drop-shadow(0 0 1px black);
  }
</style>
