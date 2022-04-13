<script lang="ts">
  import {fly} from "svelte/transition"

  export let activeRoute: string
</script>

{#key activeRoute}
  <main in:fly={{duration: 150, delay: 200, x: -60}} out:fly={{duration: 200, x: 0}} style="z-index: -1">
    <slot />
  </main>
{/key}
