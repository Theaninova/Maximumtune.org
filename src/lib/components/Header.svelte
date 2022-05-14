<script>
  import Lightbar from "./Lightbar.svelte"
  import MtLogo from "./MtLogo.svelte"

  export let activeRoute
</script>

<nav>
  <div class="nav-items-container">
    <ul class="button-group">
      {#each ["tools", "faq", "about"] as route}
        <li>
          <a class:active={activeRoute.startsWith(`/${route}`)} sveltekit:prefetch href={`/${route}`}
            >{route.toUpperCase()}</a
          >
        </li>
      {/each}
    </ul>
    <Lightbar direction="reverse" />
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
  <a sveltekit:prefetch href="/" class="home">
    <MtLogo />
    <span class="a11y-hidden">Home</span>
  </a>
</nav>

<style lang="scss">
  @import "../style/theme.scss";
  @import "../assets/images.scss";

  nav {
    filter: drop-shadow(0px 0px 2px grey);
  }

  .space-between {
  }

  .nav-items-container {
    padding: 8px;
    background: $black-3d-panel;

    width: calc(100% - 32px);
    height: 48px;

    border-bottom: #cecece solid 4px;

    display: flex;
    flex-direction: column;
    align-items: start;
    justify-content: center;
  }

  .nav-items-container > :global(div) {
    width: calc(100% - 128px);
    margin-top: 12px;
  }

  .nav-items-container > ul {
    padding-top: 6px;
  }

  .logo-container {
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
    background-color: black;
    width: 92px;
    height: 92px;
    border-radius: 50%;

    border: 8px groove #cecece;
  }
</style>
