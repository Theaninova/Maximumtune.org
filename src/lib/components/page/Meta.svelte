<script lang="ts">
  import * as meta from "./meta"

  export let title: string
  export let description: string | undefined = undefined
  export let displayTitle: string | undefined = undefined
  export let parent = "/"

  $: {
    meta.title.set(title)
  }
  $: {
    meta.displayTitle.set(displayTitle)
  }
  $: {
    meta.parent.set(parent)
  }
</script>

<svelte:head>
  <title>{title}</title>
  <meta
    name="description"
    content="{description ||
      title} - Maximumtune.org, the number one resource for Wangan Midnight Maximum Tune (WMMT)"
  />
</svelte:head>
