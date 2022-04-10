<script context="module">
  export let hydrate = false
</script>

<script>
  import Posts from "$lib/components/Posts.svelte"

  export let posts
  export let content
</script>

<main>
  {@html content}

  <Posts {posts} />
</main>

<style lang="scss">
</style>
