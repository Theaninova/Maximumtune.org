<script>
  export let activeRoute
</script>

<nav>
  <div class="space-between">
    <a sveltekit:prefetch href="/" class="home"><span class="a11y-hidden">Home</span></a>
    <ul class="button-group">
      {#each ["tools", "faq", "about"] as route}
        <li>
          <a class:active={activeRoute.startsWith(`/${route}`)} sveltekit:prefetch href={`/${route}`}
            >{route.toUpperCase()}</a
          >
        </li>
      {/each}
    </ul>
  </div>
  <hr />
</nav>

<style lang="scss">
  @import "../style/theme.scss";
  @import "../assets/images.scss";

  .space-between {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }

  nav {
    padding: 8px;
    background: $black-3d-panel;
    background-clip: border-box;
  }

  hr {
    animation: light-bar 1s ease infinite;
    display: block;
    margin: 6px 0;
  }

  .home {
    background-image: url($logo_square_48w);
    width: 48px;
    height: 48px;
    border-radius: 50%;
  }
</style>
