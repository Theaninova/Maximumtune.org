<script lang="ts">
  import SplitsInput from "$lib/components/table/SplitsInput.svelte"
  import type {Stage} from "$lib/tools/splits-calculator"
  import Meta from "$lib/components/page/Meta.svelte"

  export let data: Stage
</script>

<Meta
  title="Splits - {data.title}"
  description="Time Attach Splits Calculator for {data.title}"
  parent="/tools/splits-calculator/#{data.key}"
/>

<SplitsInput stage={data} />
