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

  <section>
    <h2>Calculators</h2>
    <hr />
    <Posts
      separator={false}
      posts={[
        {
          title: "Medals, Strength Aura, & Grade",
          path: "/tools/strength-aura-calculator",
        },
        {
          title: "Story Rank",
          path: "/tools/story-rank-calculator",
        },
      ]}
    />
  </section>

  <section>
    <h2>Posts</h2>
    <hr />
    <Posts {posts} />
  </section>
</main>

<style lang="scss">
  section {
    h2 {
      margin-bottom: 8px;
    }

    hr {
      width: 60px;
      margin: 0;
    }
  }
</style>
