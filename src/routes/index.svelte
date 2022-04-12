<script context="module">
  export let hydrate = false
</script>

<script>
  import Posts from "$lib/components/Posts.svelte"

  export let posts
</script>

<svelte:head>
  <title>Maximumtune.org</title>
  <meta name="description" content="The No.1 Resource for Wangan Midnight Maximum Tune" />
</svelte:head>

<main>
  <h1>Maximumtune.org</h1>

  <p>The No.1 Maximum Tune Resource <em>(sorta)</em></p>

  <hr />

  <h3><a href="/tools/strength-aura-calculator">The Aura Calculator Is Here</a></h3>

  <hr />

  <Posts {posts} />
</main>
