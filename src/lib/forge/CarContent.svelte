<script lang="ts">
  import type {CarInfo} from "./analyzer"
  import ModelContent from "./Model.svelte"
  import {loadNud} from "./three-nud"

  export let selected: CarInfo

  $: models = selected.fileSystem.getFile(`${selected.fileSystem.name}.mdl`).then(loadNud)
</script>

<ModelContent {models} />
