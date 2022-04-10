<script context="module">
  export const prerender = true
  export const hydrate = false
</script>

<script>
  import Logo from "$lib/assets/logo_square_48w.base64.txt?raw"
</script>

<nav>
  <a href="/"><img src={Logo} alt="Home" /></a>
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

  nav {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }

  img {
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

    li {
      padding: 4px 8px;
      margin: 1px;
      background: $color-surface-variant;

      a {
        color: $color-on-surface-variant;
      }

      transition: all $ease-default;
    }

    li:hover {
      background: $color-tertiary;

      a {
        color: $color-on-tertiary;
      }

      box-shadow: 0 0 10px 1px $color-tertiary;
    }

    li:first-child {
      border-radius: 4px 0 0 4px;
    }

    li:last-child {
      border-radius: 0 4px 4px 0;
    }

    a {
      transition: color $ease-default;
      text-decoration: none;
      text-shadow: none;
    }
  }
</style>
