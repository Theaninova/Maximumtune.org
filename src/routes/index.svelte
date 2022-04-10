<script context="module">
  export let hydrate = false
</script>

<script>
  import Posts from "$lib/components/Posts.svelte"

  export let posts
  export let content
</script>

<svelte:head>
  <title>Maximumtune.org</title>
  <meta name="description" content="The No.1 Resource for Wangan Midnight Maximum Tune" />
</svelte:head>

<main>
  {@html content}

  <hr />

  <Posts {posts} />
</main>
