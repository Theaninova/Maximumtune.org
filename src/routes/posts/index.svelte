<script context="module">
  export const hydrate = false
</script>

<script>
  import Posts from "$lib/components/Posts.svelte"

  export let posts
</script>

<svelte:head>
  <title>Posts</title>
  <meta name="description" content="Posts about Wangan Midnight Maximum Tune" />
</svelte:head>

<Posts {posts} />
