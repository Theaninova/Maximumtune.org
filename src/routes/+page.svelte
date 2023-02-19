<script lang="ts">
  import Posts from "$lib/components/Posts.svelte"
  import {browser} from "$app/environment"
  import CalculatorSelector from "$lib/components/CalculatorSelector.svelte"
  import Lightbar from "$lib/components/Lightbar.svelte"
  import Meta from "$lib/components/page/Meta.svelte"
  import {onMount} from "svelte"
  import {pwaInfo} from "virtual:pwa-info"

  onMount(async () => {
    pwaInfo && (InstallNotice = (await import("../lib/components/InstallNotice.svelte")).default)
  })

  export let data
  export let online = browser ? window.navigator.onLine : true
  let InstallNotice
</script>

<Meta title="Maximumtune.org" />

<svelte:window on:offline={(online = false)} on:online={(online = true)} />

<div>
  <section>
    <p>The No.1 Maximum Tune Resource <em>(sorta)</em></p>
    <p><em>This app is a fan project and not affiliated with WMMT or Bandai Namco</em></p>

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
  section > h2 {
    transform: skew(-10deg);
    margin-bottom: 8px;
  }

  section > :global(.light-bar) {
    width: 60px;
    margin: 0;
  }
</style>
