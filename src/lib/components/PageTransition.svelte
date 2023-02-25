<script lang="ts">
  import {fly} from "svelte/transition"
  import Header from "$lib/components/layout/Header.svelte"
  import {afterNavigate, beforeNavigate} from "$app/navigation"
  import {backIn, cubicIn, expoOut, quadOut, quintIn, quintOut} from "svelte/easing"

  export let pathname: string

  const duration = 250
  const delay = 250

  let direction = 1
  let isNavigating = false
  let realDelay = delay
  beforeNavigate(navigation => {
    realDelay = delay
    direction =
      navigation.from.url.pathname.split("/").length > navigation.to.url.pathname.split("/").length ? -1 : 1
    isNavigating = true
  })
  afterNavigate(() => {
    isNavigating = false
  })
</script>

{#key isNavigating}
  {#if !isNavigating}
    <nav in:fly={{duration, delay, y: -128}} out:fly={{duration: duration, y: -128}}>
      <Header {pathname} />
    </nav>
    <main
      in:fly={{duration: duration, delay, easing: quadOut, x: -50}}
      out:fly={{duration: duration, easing: quintIn, x: -150}}
      on:outroend={() => (realDelay = 0)}
    >
      <slot />
    </main>
  {/if}
{/key}

<style lang="scss">
  @import "../style/theme";

  main {
    contain: strict;
    overflow-y: auto;
    display: flex;
    grid-column: 1;
    grid-row: 1;
    flex-direction: column;
    flex-grow: 1;
    align-items: center;
    justify-content: start;

    padding-top: 68px;

    > :global(*) {
      width: $content-width;
      margin-inline: 8px;
    }
  }

  nav {
    will-change: transform;

    z-index: 100;

    grid-column: 1;
    grid-row: 1;

    height: fit-content;

    filter: drop-shadow(0 0 2px grey);
  }
</style>
