<script>
  import Lightbar from "./Lightbar.svelte"
  import MtLogo from "./MtLogo.svelte"
  import {page} from "$app/stores"

  const pageTitles = {
    "/": "Home",
    "/about/": "About",
    "/faq/": "FAQ",
    "/tools/splits-calculator/": "Splits",
    "/tools/story-rank-calculator/": "Story",
    "/tools/battle-grade-calculator/": "Battle Grade",
  }
  let pageTitle = pageTitles[$page.url.pathname]
  let showBackButton = $page.url.pathname !== "/"

  // eslint-disable-next-line unicorn/prefer-top-level-await
  $: (async () => {
    void $page.url.pathname
    if (!container) return
    container.classList.remove("header-go-in-out")
    void container.offsetWidth
    container.classList.add("header-go-in-out")

    await new Promise(resolve => setTimeout(resolve, 250))
    pageTitle = pageTitles[$page.url.pathname]
    showBackButton = $page.url.pathname !== "/"
  })()
  let container
</script>

<nav bind:this={container}>
  <div class="nav-items-container">
    <div class="page-title">
      {pageTitle || "No Title"}
    </div>
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
  <a sveltekit:prefetch href="/" class="home">
    <MtLogo {showBackButton} />
    <span class="a11y-hidden">Home</span>
  </a>
</nav>

<style lang="scss">
  @import "../style/theme.scss";
  @import "../assets/images.scss";

  @keyframes in-out {
    0% {
      transform: translateY(0);
    }
    40% {
      transform: translateY(-128px);
    }
    60% {
      transform: translateY(-128px);
    }
    100% {
      transform: translateY(0);
    }
  }

  :global(.header-go-in-out) {
    animation: in-out 0.5s ease;
  }

  .page-title {
    font-size: 1.4rem;
    font-weight: bolder;
    letter-spacing: 1.2px;
    transform: skew(-15deg);
    filter: drop-shadow(0px 0px 2px black);
  }

  nav {
    filter: drop-shadow(0px 0px 2px grey);
    will-change: transform;
    z-index: 100;

    grid-column: 1;
    grid-row: 1;
  }

  a {
    all: unset;
    transition: filter 0.2s ease;
    cursor: pointer;
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
    background-color: black;
    width: 92px;
    height: 92px;
    border-radius: 50%;
    transform: rotate(180deg);

    border: 8px groove #cecece;

    :global(svg) {
      transform: rotate(180deg);
    }
  }
</style>
