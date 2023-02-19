<script>
  import HeaderPadding from "../HeaderPadding.svelte"
  import Meta from "$lib/components/page/Meta.svelte"

  export let title
  export let author
  export let date
  export let description
</script>

<Meta {title} {description} />

<svelte:head>
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
