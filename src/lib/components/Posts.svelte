<script context="module">
  export const hydrate = false
</script>

<script>
  export let posts
  export let separator = true
  export let prefetch = false
</script>

<ul>
  {#each posts as { path, title, date, description }}
    <li>
      <a sveltekit:prefetch={prefetch} href={path}>
        <article>
          <h3>{title}</h3>
          {#if date}
            <time datetime={date}>{new Date(date).toDateString()}</time>
          {/if}
          {#if description}<p>{@html description}</p>{/if}
        </article>
        {#if separator}<hr />{/if}
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
