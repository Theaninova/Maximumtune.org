<!-- @hmr:keep-all -->
<script lang="ts">
  import Lumen from "$lib/forge/Lumen.svelte"
  import DropTarget from "$lib/components/util/DropTarget.svelte"

  $: lumenFile = files?.find(it => it.name.toLowerCase().endsWith(".lmd"))
  $: textureFile = files?.find(it => it.name.toLowerCase().endsWith(".nut"))
  // eslint-disable-next-line no-undef
  let files: File[]
</script>

<DropTarget bind:files />

{#if files}
  <Lumen {lumenFile} {textureFile} />
{/if}
