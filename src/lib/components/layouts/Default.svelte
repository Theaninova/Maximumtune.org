<script>
  import HeaderPadding from "../HeaderPadding.svelte"
  import Meta from "$lib/components/page/Meta.svelte"

  export let title
  export let description
</script>

<Meta {title} {description} />

<article>
  <HeaderPadding />
  <slot />
</article>
