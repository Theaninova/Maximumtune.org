<script lang="ts">
  import Lightbar from "../Lightbar.svelte"
  import MtLogo from "../MtLogo.svelte"
  import {parent} from "$lib/components/page/meta"
  import {fallbackLocale, locale} from "$lib/translations/translations"
  import {t} from "$lib/translations/translations"

  export let pathname: string
</script>

<div class="nav-items-container">
  <div class="page-title">{$t(`${pathname}.title`)}</div>
  <Lightbar direction="reverse" type="slide" />
</div>
<svg viewBox="0 0 192 92">
  <defs>
    <linearGradient
      id="plastic-surface"
      x1="0"
      y1="0"
      x2="1"
      y2="0"
      gradientUnits="userSpaceOnUse"
      gradientTransform="matrix(5.63338e-15,-92,92,5.63338e-15,100,92)"
    >
      <stop offset="0" style="stop-color:#f2f2f2;stop-opacity:1" />
      <stop offset="0.59" style="stop-color:#8c8c8c;stop-opacity:1" />
      <stop offset="0.61" style="stop-color:#bfbfbf;stop-opacity:1" />
      <stop offset="1" style="stop-color:#fff;stop-opacity:1" />
    </linearGradient>
  </defs>
  <path
    d="M0,74l38.859,0c7.977,0 15.191,-4.74 18.357,-12.062c9.068,-20.971 26.784,-61.938 26.784,-61.938l108,0l-0,55l-92,0l0,37c0,0 -0,-0 -0,-0c-6.943,-8.863 -17.578,-14.038 -28.837,-14.033c-25.979,0.012 -71.163,0.033 -71.163,0.033l0,-4Z"
    fill="url(#plastic-surface)"
  />
</svg>
<a href={$locale !== fallbackLocale ? `/${$locale}${$parent}` : $parent} class="home">
  <MtLogo showBackButton={pathname !== "/"} />
  <span class="a11y-hidden">Home</span>
</a>

<style lang="scss">
  @import "../../style/theme";

  .page-title {
    transform: skew(-15deg);

    min-height: 1.4rem;

    font-size: 1.4rem;
    font-weight: bolder;
    letter-spacing: 1.2px;

    filter: drop-shadow(0 0 2px black);
  }

  a {
    all: unset;
    cursor: pointer;
    transition: filter 0.2s ease;
  }

  .nav-items-container {
    display: flex;
    flex-direction: column;
    align-items: start;
    justify-content: center;

    width: calc(100% - 32px);
    height: 48px;
    padding: 8px;

    background: $black-3d-panel;
    border-bottom: #cecece solid 4px;
  }

  .nav-items-container > :global(.light-bar) {
    width: calc(100% - 128px);
    margin-top: 12px;
  }

  svg,
  .home {
    position: absolute;
    top: -10px;
    right: 0;
  }

  svg {
    width: 192px;
    height: 92px;
  }

  .home {
    transform: rotate(180deg);

    width: 92px;
    height: 92px;

    background-color: black;
    border: 8px groove #cecece;
    border-radius: 50%;

    :global(svg) {
      transform: rotate(180deg);
    }
  }
</style>
