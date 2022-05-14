<script>
  export let activeRoute
</script>

<footer>
  <ul class="button-group">
    {#each ["tools", "faq", "about"] as route}
      <li>
        <a class:active={activeRoute.startsWith(`/${route}`)} sveltekit:prefetch href={`/${route}`}
          >{route.toUpperCase()}</a
        >
      </li>
    {/each}
  </ul>
</footer>

<style lang="scss">
  @import "../style/theme.scss";

  @keyframes in-out-top {
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

  @keyframes in-out-bottom {
    0% {
      transform: translateY(0);
    }
    40% {
      transform: translateY(128px);
    }
    60% {
      transform: translateY(128px);
    }
    100% {
      transform: translateY(0);
    }
  }

  @keyframes in-out-left {
    0% {
      transform: translateX(0);
    }
    40% {
      transform: translateX(-128px);
    }
    60% {
      transform: translateX(-128px);
    }
    100% {
      transform: translateY(0);
    }
  }

  footer {
    background: $black-3d-panel;
    width: 100%;
    height: 100%;
  }
</style>
