<script context="module">
  export const prerender = true
  export const hydrate = false
</script>

<nav>
  <a href="/" class="home"><span class="a11y-hidden">Home</span></a>
  <ul>
    <li>
      <a href="/tools">Tools</a>
    </li>
    <li><a href="/faq">FAQ</a></li>
    <li><a href="/about">About</a></li>
  </ul>
</nav>

<style lang="scss">
  @import "../style/theme.scss";
  @import "../assets/images.scss";

  nav {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }

  .home {
    background-image: url($logo_square_48w);
    width: 48px;
    height: 48px;
    border-radius: 50%;
  }

  ul {
    // horizontal
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    align-items: center;
    list-style: none;

    a {
      padding: 4px 8px;
      margin: 1px;
      background: $color-surface-variant;
      color: $color-on-surface-variant;

      transition: all $ease-default;
      text-decoration: none;
      text-shadow: none;
    }

    a:hover {
      background: $color-tertiary;
      color: $color-on-tertiary;

      box-shadow: 0 0 10px 1px $color-tertiary;
    }

    li:first-child a {
      border-radius: 4px 0 0 4px;
    }

    li:last-child a {
      border-radius: 0 4px 4px 0;
    }
  }
</style>
