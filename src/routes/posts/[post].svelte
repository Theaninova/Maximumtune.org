<script context="module">
  export const hydrate = false
</script>

<script>
  export let title
  export let author
  export let date
  export let description
  export let html
</script>

<svelte:head>
  <title>{title}</title>
  <meta name="description" content={description} />
  <meta name="og:type" content="article" />
  <meta name="og:article:title" content={title} />
  <meta name="og:article:author" content={author} />
  <meta name="og:article:published_time" content={date} />
</svelte:head>

<main>
  <article>
    <h1>{title}</h1>
    <time datetime={date}>{new Date(date).toDateString()}</time>
    <br />

    {@html html}
  </article>
</main>
