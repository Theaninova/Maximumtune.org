<script context="module">
  export const hydrate = false
</script>

<script>
  export let posts
</script>

<ul>
  {#each posts as { path, title, date, description }}
    <li>
      <a href="/posts/{path}">
        <article>
          <h2>{title}</h2>
          <time datetime={date}>{new Date(date).toDateString()}</time>
          <p>{@html description}</p>
        </article>
        <hr />
      </a>
    </li>
  {/each}
</ul>

<style lang="scss">
  @import "../style/theme.scss";

  ul {
    list-style: none;
    margin: 0;
    padding: 0;
  }

  a {
    color: unset;
    text-decoration: none;
    text-shadow: none;
  }

  hr {
    width: 50px;
  }
  li:last-child hr {
    display: none;
  }
</style>
