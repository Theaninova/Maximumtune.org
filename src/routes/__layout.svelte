<script>
  import Header from "$lib/components/Header.svelte"
</script>

<Header />

<slot />

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

  a {
    color: $color-secondary;
    transition: text-shadow 0.2s ease-in-out;
  }

  u {
    text-decoration-color: $color-tertiary;
    text-decoration-style: wavy;
    text-decoration-thickness: 2px;
  }

  a:hover {
    text-shadow: $color-secondary 0 0 10px;
  }

  main {
    margin: 0 8px;
  }

  main > * {
    width: min(16.5cm, 100%);
  }

  body {
    font-family: "Roboto Flex", "Roboto", sans-serif;

    background: radial-gradient($color-background, #080808);
    color: $color-on-background;
    margin: 0;
    min-height: 100vh;
  }

  hr {
    height: 2px;
    background: linear-gradient(
      90deg,
      $color-tertiary-container,
      $color-tertiary 80%,
      $color-tertiary-container
    );
    box-shadow: $color-tertiary 0 0 20px;
    border: none;
    margin: 32px auto;
  }

  h2,
  h3 {
    color: $color-secondary;
    text-shadow: $color-secondary-container 0 0 5px;
    transition: text-shadow $ease-default;
  }

  h2:hover,
  h3:hover {
    text-shadow: $color-secondary 0 0 20px;
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
    -moz-background-clip: text;
    -webkit-text-fill-color: transparent;
    -moz-text-fill-color: transparent;
    text-shadow: darken($color-tertiary, 5%) 0 0 30px;
    transition: text-shadow $ease-default;

    margin: 16px 0;

    font-stretch: 120%;
  }

  h1:hover {
    text-shadow: $color-tertiary 0 0 20px;
  }

  h3 > a,
  h2 > a,
  h1 > a {
    transition: color $ease-default;
    text-decoration: none;
    color: unset;
  }

  main,
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
</style>
