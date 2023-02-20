<script lang="ts">
  import "$lib/style/global.scss"
  import PageTransition from "$lib/components/PageTransition.svelte"
  import Backdrop from "$lib/components/art/Backdrop.svelte"
  import {pwaInfo} from "virtual:pwa-info"
  import {fallbackLocale, locales} from "$lib/translations/translations"
  import {t} from "$lib/translations/translations"

  export let data
  $: webManifest = pwaInfo ? pwaInfo.webManifest.linkTag : ""
</script>

<svelte:head>
  {@html webManifest}
  {#each locales as locale}
    <link
      rel="alternate"
      hreflang={locale}
      href="{locale === fallbackLocale ? '' : `/${locale}`}{data.pathname}"
    />
  {/each}
  <title>{$t(`${data.pathname}.meta.title`)}</title>
  <meta
    name="description"
    content="{$t(`${data.pathname}.meta.description`)} - {$t('meta.description_suffix')}"
  />
</svelte:head>

<PageTransition pathname={data.pathname}>
  <slot />
</PageTransition>

<Backdrop />

<style global lang="scss">
  @use "sass:color";
  @import "../../lib/style/theme"; /* stylelint-disable-line order/order */

  a {
    @include hover {
      filter: drop-shadow($color-secondary 0 0 10px);
    }

    will-change: filter;
    color: $color-secondary;
    filter: drop-shadow($color-secondary 0 0 0);
    transition: filter 0.2s ease-in-out;
  }

  u {
    text-decoration-color: $color-tertiary;
    text-decoration-style: wavy;
    text-decoration-thickness: 2px;
  }

  main {
    overflow-y: auto;
    display: flex;
    flex-direction: column;
    flex-grow: 1;
    align-items: center;
    justify-content: start;
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
    display: grid;
    grid-template-rows: 68px auto;

    margin: 0;

    font-family: "Roboto Flex", Roboto, sans-serif;
    color: $color-on-background;
  }

  h2,
  h3 {
    will-change: filter;
    color: $color-secondary;
    filter: drop-shadow($color-secondary-container 0 0 5px);
    transition: filter $ease-default;
  }

  a > h2 {
    @include hover {
      filter: drop-shadow($color-secondary 0 0 20px);
    }
  }

  h1 {
    margin: 16px 0;

    font-stretch: 120%;

    // color: $color-tertiary;
    background-color: #f3ec78;
    background-image: linear-gradient(
      0deg,
      color.adjust($color-tertiary-container, $lightness: 10%),
      color.adjust($color-tertiary, $lightness: 0%),
      color.adjust($color-tertiary-container, $lightness: 10%)
    );
    -webkit-background-clip: text; // stylelint-disable-line property-no-vendor-prefix
    background-clip: text;
    background-size: 100%;
    filter: drop-shadow($color-tertiary 0 0 20px);

    -webkit-text-fill-color: transparent;
    -moz-text-fill-color: transparent;
  }

  h3 > a,
  h2 > a,
  h1 > a {
    color: unset;
    text-decoration: none;
    transition: color $ease-default;
  }

  .center {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }

  .a11y-hidden:not(:focus, :active) {
    position: absolute;

    overflow: hidden;

    width: 1px;
    height: 1px;

    white-space: nowrap;

    clip: rect(0 0 0 0);
    clip-path: inset(50%);
  }

  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    margin: 0;
    appearance: none;
  }

  // noinspection CssUnknownTarget
  @font-face {
    font-family: "Roboto Flex";
    font-weight: 100 1000;
    font-display: fallback;
    font-stretch: 25% 151%;
    src: url("/fonts/roboto-flex.min.ttf") format("woff2 supports variations"),
      url("/fonts/roboto-flex.min.ttf") format("woff2-variations");
    unicode-range: U+20-7E;
  }

  // noinspection CssUnknownTarget
  @font-face {
    font-family: "Roboto Flex";
    font-weight: 100 1000;
    font-display: swap;
    font-stretch: 25% 151%;
    src: url("/fonts/RobotoFlex.ttf") format("woff2 supports variations"),
      url("/fonts/RobotoFlex.ttf") format("woff2-variations");
    unicode-range: U+00A0-FB04;
  }

  // noinspection CssInvalidAtRule
  @layer base {
    html {
      -webkit-tap-highlight-color: transparent;
    }
  }
</style>
