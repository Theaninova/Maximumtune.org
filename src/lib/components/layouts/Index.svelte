<script>
  import Posts from "$lib/components/Posts.svelte"
  import {browser} from "$app/env"

  export let posts
  export let online = browser ? window.navigator.onLine : true

  export let title
  export let description
</script>

<svelte:head>
  <title>{title}</title>
  <meta name="description" content={description} />
</svelte:head>

<svelte:window on:offline={(online = false)} on:online={(online = true)} />

<main>
  <section>
    <slot />
  </section>
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

<style>
  section h2 {
    margin-bottom: 8px;
  }

  section hr {
    width: 60px;
    margin: 0;
  }
</style>
