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
  <strong><a href="/tools/strength-aura-calculator">The Aura Calculator Is Here</a></strong>
  <hr />

  <div>
    <h2 style="margin-bottom: 8px">Posts</h2>
    <hr style="width: 60px; margin: 0" />
  </div>
  <Posts {posts} />
</main>
