<script lang="ts">
  import type {Info} from "./analyzer"
  import StageContent from "./StageContent.svelte"
  import CarContent from "./CarContent.svelte"
  export let selected: Info
</script>

{#if selected.type === "stage"}
  <StageContent {selected} />
{:else if selected.type === "car"}
  <CarContent {selected} />
{/if}
