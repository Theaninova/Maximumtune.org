<script lang="ts">
  import Background from "$lib/assets/badge/badge.svg"

  export let href: string
  export let color = "#de441a"
  export let cornerRadius = 128
  export let title = "Battle"
  export let subtitle = "Grade"
</script>

<a {href}>
  <object type="image/svg+xml" data={Background} title="button">
    <param name="color" value={color} />
    <param name="corner-radius" value={cornerRadius} />
  </object>
  <svg viewBox="0 0 256 256">
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
    @include hover {
      transform: scale(1.1);
    }

    all: unset;

    will-change: transform;
    cursor: pointer;

    transform: scale(1);

    display: grid;

    aspect-ratio: 1;

    background-position: center;

    transition: transform 0.2s $mt-interpolation;

    > * {
      grid-column: 1;
      grid-row: 1;
    }
  }

  a > svg > text {
    font-family: "Roboto Flex", Roboto, sans-serif;
    font-weight: bolder;
    text-transform: uppercase;
    filter: drop-shadow(0 0 1px black) drop-shadow(0 0 1px black);
  }
</style>
