<script lang="ts">
  import {fly} from "svelte/transition"

  export let pathname
</script>

{#key pathname}
  <main in:fly={{duration: 250, delay: 300, x: -150}} out:fly={{duration: 250, x: -150}}>
    <slot />
  </main>
{/key}

<style global>
  main {
    will-change: transform, opacity;
    grid-column: 1;
    grid-row: 2;
  }
</style>
