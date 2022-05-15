<script context="module">
  export const hydrate = false
</script>

<script>
  import HeaderPadding from "../HeaderPadding.svelte"

  export let title
  export let author
  export let date
  export let description
</script>

<svelte:head>
  <title>{title}</title>
  <meta name="description" content={description} />
  <meta name="og:type" content="article" />
  <meta name="og:article:title" content={title} />
  <meta name="og:article:author" content={author} />
  <meta name="og:article:published_time" content={date} />
</svelte:head>

<article>
  <HeaderPadding />
  <header>
    <h1>{title}</h1>
    <time datetime={date}>{new Date(date).toDateString()}</time>
  </header>
  <br />

  <slot />
</article>
