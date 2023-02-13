<script lang="ts">
  import type {StageInfo} from "./analyzer"
  import Model from "./Model.svelte"
  import {loadStage} from "./stage"

  export let selected: StageInfo

  $: models = selected
    ? loadStage(selected).then(it => {
        console.log("done")
        return it
      })
    : undefined
</script>

{#key models}
  {#await models}
    <h2>Loading Stage, please be patient...</h2>
  {:then models}
    <Model models={Promise.resolve(models)} />
  {/await}
{/key}
