<script lang="ts">
  import type {CarInfo} from "./analyzer"
  import ModelContent from "./Model.svelte"
  import {loadNud} from "./three-nud"

  export let selected: CarInfo

  $: models = selected.fileSystem.getFile(`${selected.fileSystem.name}.mdl`).then(async file => {
    return loadNud(
      file,
      await Promise.all(
        [
          {tex: `${selected.fileSystem.name}.tex`, pick: undefined},
          {tex: `${selected.fileSystem.name}_AERO_SET.tex`, pick: 22},
        ].map(async it => ({...it, tex: await selected.fileSystem.getFile(it.tex)})),
      ),
    )
  })
</script>

<ModelContent {models} />
