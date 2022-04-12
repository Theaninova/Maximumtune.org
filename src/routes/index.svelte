<script>
  import Posts from "$lib/components/Posts.svelte"
  import {browser} from "$app/env"

  export let posts
  export let online = browser ? window.navigator.onLine : true
</script>

<svelte:head>
  <title>Maximumtune.org</title>
  <meta name="description" content="The No.1 Resource for Wangan Midnight Maximum Tune" />
</svelte:head>

<svelte:window on:offline={(online = false)} on:online={(online = true)} />

<main>
  <h1>Maximumtune.org</h1>
  <p>The No.1 Maximum Tune Resource <em>(sorta)</em></p>
  <hr />

  <section>
    <h2>Calculators</h2>
    <hr />
    <Posts
      separator={false}
      prefetch={true}
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
    {#if online}
      <h2>Posts</h2>
      <hr />
      <Posts {posts} />
    {:else}
      <h2>You're offline!</h2>
      <hr />
      <p>Posts aren't available while you're offline :(</p>
    {/if}
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
