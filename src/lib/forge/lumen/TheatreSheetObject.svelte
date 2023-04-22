<script lang="ts">
  import type {ISheet} from "@theatre/core"

  export let sheet: ISheet
  export let key: string
  export let props: any

  $: object = sheet.object(key, props)
  $: {
    object.onValuesChange(it => {
      values = it
    })
  }
  let values: any
</script>

<slot {...values} />
