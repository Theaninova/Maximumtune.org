<script>
  export let activeRoute
</script>

<nav>
  <div class="space-between">
    <a sveltekit:prefetch href="/" class="home"><span class="a11y-hidden">Home</span></a>
    <ul>
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
    background: linear-gradient(
      lighten($color-surface-variant, 10%),
      darken($color-surface-variant, 50%) 50%,
      #000 51%,
      #000
    );
    background-clip: border-box;
  }

  hr {
    display: block;
    margin: 6px 0;
    box-shadow: $color-tertiary 0 0 8px;
  }

  .home {
    background-image: url($logo_square_48w);
    width: 48px;
    height: 48px;
    border-radius: 50%;
  }

  ul {
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    align-items: center;
    gap: $item-gap;

    list-style: none;
    margin: 0;

    a {
      @include hover() {
        background: $color-tertiary-container;
        color: $color-on-tertiary-container;

        box-shadow: 0 0 8px 2px $color-tertiary inset;
      }
    }
    .active {
      background: $color-tertiary-container;
      color: $color-on-tertiary-container;

      box-shadow: 0 0 8px 2px $color-tertiary inset;
    }

    a {
      padding: 5px 12px;
      background: $color-surface-variant;
      color: $color-on-surface-variant;
      box-shadow: $inset-shadow;

      transition: all $ease-default;
      text-decoration: none;
      text-shadow: none;
    }

    li:first-child a {
      border-radius: $border-radius-left;
    }

    li:last-child a {
      border-radius: $border-radius-right;
    }
  }
</style>
