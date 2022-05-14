<script lang="ts">
  import {fly} from "svelte/transition"

  export let activeRoute: string
</script>

{#key activeRoute}
  <main in:fly={{duration: 200, delay: 300, x: -150}} out:fly={{duration: 200, x: -150}}>
    <slot />
  </main>
{/key}
