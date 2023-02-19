<script lang="ts">
  import {fly} from "svelte/transition"
  import Header from "$lib/components/Header.svelte"
  import {afterNavigate, beforeNavigate} from "$app/navigation"

  export let pathname: string

  const duration = 250
  const delay = 300

  let isNavigating = false
  beforeNavigate(() => {
    isNavigating = true
  })
  afterNavigate(() => {
    isNavigating = false
  })
</script>

{#key isNavigating}
  {#if !isNavigating}
    <nav in:fly={{duration, delay, y: -128}} out:fly={{duration, y: -128}}>
      <Header {pathname} />
    </nav>
    <main in:fly={{duration, delay, x: -150}} out:fly={{duration, x: -150}}>
      <slot />
    </main>
  {/if}
{/key}

<style global>
  main {
    will-change: transform, opacity;
    grid-column: 1;
    grid-row: 2;
  }

  nav {
    will-change: transform;

    z-index: 100;

    grid-column: 1;
    grid-row: 1;

    filter: drop-shadow(0 0 2px grey);
  }
</style>
