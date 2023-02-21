<script lang="ts">
  import SplitsInput from "$lib/components/tools/splits/SplitsInput.svelte"
  import type {Stage} from "$lib/tools/splits-calculator"

  export let data: Stage
</script>

<SplitsInput stage={data} />
