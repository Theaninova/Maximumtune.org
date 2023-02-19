<script lang="ts">
  import Posts from "$lib/components/Posts.svelte"
  import {browser, dev} from "$app/environment"
  import CalculatorSelector from "../CalculatorSelector.svelte"
  import Lightbar from "../Lightbar.svelte"
  import {onMount} from "svelte"
  import Meta from "$lib/components/page/Meta.svelte"

  export let data
  export let online = browser ? window.navigator.onLine : true

  export let title
  export let description

  let InstallNotice
  onMount(() => {
    if (!dev || !browser) return

    import("$lib/components/InstallNotice.svelte").then(it => {
      InstallNotice = it.default
    })
  })
</script>

<Meta {title} {description} />

<svelte:window on:offline={(online = false)} on:online={(online = true)} />

<div>
  <section>
    <slot />

    {#if InstallNotice}
      <svelte:component this={InstallNotice} />
    {/if}
  </section>

  <section>
    <h2>Info</h2>
    <Lightbar />
    <a href="/faq/">FAQ</a>
    <a href="/about/">About</a>
  </section>

  <section>
    <h2>Calculators</h2>
    <Lightbar />
    <CalculatorSelector />
  </section>

  <section>
    {#if online}
      <h2>Posts</h2>
      <Lightbar />
      <Posts posts={data.posts} />
    {:else}
      <h2>You're offline!</h2>
      <Lightbar />
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
    transform: skew(-10deg);
    margin-bottom: 8px;
  }

  section > :global(.light-bar) {
    width: 60px;
    margin: 0;
  }
</style>
