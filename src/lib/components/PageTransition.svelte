<script lang="ts">
  import {fly} from "svelte/transition"
  import Header from "$lib/components/Header.svelte"
  import {navigating} from "$app/stores"

  export let pathname: string
  $: isNavigating = $navigating !== null ? true : undefined

  const duration = 250
  const delay = 300

  $: {
    console.log(isNavigating)
  }
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
