<script>
  import Posts from "$lib/components/Posts.svelte"
  import {browser} from "$app/env"
  import CalculatorSelector from "../CalculatorSelector.svelte"

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

<div>
  <section>
    <h1>Maximumtune.org</h1>

    <slot />
  </section>
  <section>
    <h2>Calculators</h2>
    <hr />
    <CalculatorSelector />
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
</div>

<style lang="scss">
  h1 {
    transform: skew(-15deg);
    font-size: 30px;
    font-weight: 900;
    font-stretch: 150%;
  }

  section > h2 {
    margin-bottom: 8px;

    transform: skew(-10deg);
  }

  section > hr {
    width: 60px;
    margin: 0;
  }
</style>
