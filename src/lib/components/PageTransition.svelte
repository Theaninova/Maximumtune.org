<script lang="ts">
  import {fly, fade} from "svelte/transition"

  export let activeRoute: string
</script>

{#key activeRoute}
  <main in:fly={{duration: 250, delay: 200, x: -150}} out:fade={{duration: 200}}>
    <slot />
  </main>
{/key}
