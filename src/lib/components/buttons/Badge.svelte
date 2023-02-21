<script lang="ts">
  import BadgeBackground from "$lib/assets/red_badge.webp"

  export let href: string
  export let imageHref: string | undefined
  export let color = ""
  export let title = "Battle"
  export let subtitle = "Grade"
</script>

<a {href} aria-label="{title} {subtitle}" id="{title.toLowerCase()}_{subtitle.toLowerCase()}">
  <div
    class="background"
    class:no-color={!color}
    class:blue={color === "blue"}
    class:red={color === "red"}
    style:background-image="url({BadgeBackground})"
  />
  <div class="image" style:background-image={imageHref ? `url(${imageHref})` : undefined} />
  <svg width="100%" height="100%" viewBox="0 0 256 256" xmlns="http://www.w3.org/2000/svg">
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
  </svg>
</a>

<style lang="scss">
  @import "../../style/theme";

  a {
    @include hover {
      scale: 1.1;

      .glow {
        opacity: 1;
      }
    }

    will-change: scale;
    cursor: pointer;

    position: relative;
    scale: 1;

    aspect-ratio: 1;

    transition: scale 0.2s $mt-interpolation;

    > * {
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
    }
  }

  .background {
    background-size: 90%;

    &.red {
      filter: none;
    }

    &.no-color {
      filter: hue-rotate(12deg) contrast(120%) saturate(20%);
    }

    &.blue {
      filter: hue-rotate(210deg) contrast(110%);
    }
  }

  div {
    background-repeat: no-repeat;
    background-position: center;
  }

  .image {
    background-size: 85%;
  }

  svg {
    font-family: "Roboto Flex", Roboto, sans-serif;
    font-weight: bolder;
    text-transform: uppercase;
    filter: drop-shadow(0 0 1px black) drop-shadow(0 0 1px black);
  }
</style>
