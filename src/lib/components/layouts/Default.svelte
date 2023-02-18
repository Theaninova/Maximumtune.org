<script>
  import HeaderPadding from "../HeaderPadding.svelte"

  export let title
  export let description
</script>

<svelte:head>
  <title>{title}</title>
  <meta name="description" content={description} />
</svelte:head>

<article>
  <HeaderPadding />
  <slot />
</article>
