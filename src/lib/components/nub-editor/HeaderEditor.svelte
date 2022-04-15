<script lang="ts">
  import {camelCaseToTitleCase} from "../../tools/string-manipulation"
  import {userEditable} from "../../tools/formats/nub/nub-converter"
  import type {WavHeader} from "../../tools/formats/nub/nub-converter"

  export let title: string
  export let header: WavHeader
  let overrideEditable = false
</script>

<table>
  <caption>
    {title}
    <input disabled accept=".wav" type="file" />
    Edit All
    <input name="editAll" type="checkbox" bind:checked={overrideEditable} />
  </caption>
  {#each Object.entries(header) as [key, value]}
    <tr>
      <th>{camelCaseToTitleCase(key)}</th>
      <td
        ><input
          disabled={!userEditable[key] && !overrideEditable}
          type="number"
          name={key}
          placeholder={value}
        /></td
      >
    </tr>
  {/each}
</table>
