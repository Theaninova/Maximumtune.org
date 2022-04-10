<script context="module">
  export const hydrate = false
</script>

<script>
  import Posts from "$lib/components/Posts.svelte"

  export let posts
</script>

<Posts {posts} />
