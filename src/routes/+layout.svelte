<script>
  import Header from "$lib/components/Header.svelte"
  import PageTransition from "$lib/components/PageTransition.svelte"
  import Backdrop from "$lib/components/Backdrop.svelte"
  import {browser} from "$app/environment"

  export let data
</script>

<svelte:head>
  {#if browser}
    <link rel="manifest" href="/manifest.webmanifest" />
  {/if}
</svelte:head>

<Header />

<PageTransition pathname={data.pathname}>
  <slot />
</PageTransition>

<Backdrop />

<style global lang="scss">
  @import "../lib/style/theme.scss";

  //noinspection CssUnknownTarget
  @font-face {
    font-family: "Roboto Flex";
    src: url("/fonts/roboto-flex.min.ttf") format("woff2 supports variations"),
      url("/fonts/roboto-flex.min.ttf") format("woff2-variations");
    font-weight: 100 1000;
    font-stretch: 25% 151%;
    font-display: fallback;
    unicode-range: U+20-7E;
  }

  //noinspection CssUnknownTarget
  @font-face {
    font-family: "Roboto Flex";
    src: url("/fonts/RobotoFlex.ttf") format("woff2 supports variations"),
      url("/fonts/RobotoFlex.ttf") format("woff2-variations");
    font-weight: 100 1000;
    font-stretch: 25% 151%;
    font-display: swap;
    unicode-range: U+00A0-FB04;
  }

  //noinspection CssInvalidAtRule
  @layer base {
    html {
      -webkit-tap-highlight-color: transparent;
    }
  }

  a {
    color: $color-secondary;
    transition: filter 0.2s ease-in-out;
    will-change: filter;
    filter: drop-shadow($color-secondary 0 0 0);
    @include hover() {
      filter: drop-shadow($color-secondary 0 0 10px);
    }
  }

  u {
    text-decoration-color: $color-tertiary;
    text-decoration-style: wavy;
    text-decoration-thickness: 2px;
  }

  main {
    overflow-y: auto;

    flex-grow: 1;
    display: flex;
    flex-direction: column;
    justify-content: start;
    align-items: center;
  }

  main > * {
    width: $content-width;
    margin-inline: 8px;
  }

  html,
  body {
    overflow: hidden;
    height: 100%;
  }

  body {
    font-family: "Roboto Flex", "Roboto", sans-serif;

    display: grid;
    grid-template-rows: 68px auto;
    color: $color-on-background;
    margin: 0;
  }

  h2,
  h3 {
    color: $color-secondary;
    will-change: filter;
    filter: drop-shadow($color-secondary-container 0 0 5px);
    transition: filter $ease-default;
  }

  a > h2,
  a > h2 {
    @include hover() {
      filter: drop-shadow($color-secondary 0 0 20px);
    }
  }

  h1 {
    // color: $color-tertiary;
    background-color: #f3ec78;
    background-image: linear-gradient(
      0deg,
      lighten($color-tertiary-container, 10%),
      lighten($color-tertiary, 0%),
      lighten($color-tertiary-container, 10%)
    );
    background-size: 100%;
    -webkit-background-clip: text;
    //noinspection CssInvalidPropertyValue
    -moz-background-clip: text;
    -webkit-text-fill-color: transparent;
    //noinspection CssUnknownProperty
    -moz-text-fill-color: transparent;
    filter: drop-shadow($color-tertiary 0 0 20px);

    margin: 16px 0;

    font-stretch: 120%;
  }

  h3 > a,
  h2 > a,
  h1 > a {
    transition: color $ease-default;
    text-decoration: none;
    color: unset;
  }

  .center {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  .a11y-hidden:not(:focus):not(:active) {
    clip: rect(0 0 0 0);
    clip-path: inset(50%);
    height: 1px;
    overflow: hidden;
    position: absolute;
    white-space: nowrap;
    width: 1px;
  }

  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
</style>
