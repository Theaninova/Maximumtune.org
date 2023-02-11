<script>
  import "../../lib/style/table.scss"
  import {fileFormats, tableOrder} from "./file-format-list"
  import FileFormatTableEntry from "./FileFormatTableEntry.svelte"
</script>

<table>
  <caption>File Formats</caption>
  <thead>
    {#each tableOrder as { field, title }}
      <th>{title ?? field ?? ""}</th>
    {/each}
  </thead>
  <tbody>
    {#each fileFormats.sort((a, b) => (a.category || "z").localeCompare(b.category)) as format}
      <tr>
        <FileFormatTableEntry {format} />
      </tr>
      {#each format.overrides || [] as override}
        <tr class="override">
          <FileFormatTableEntry format={override} />
        </tr>
      {/each}
    {/each}
  </tbody>
</table>

<style lang="scss">
  table {
    border-spacing: 8px;
    border-collapse: separate;
  }

  tr.override > :global(th)::before {
    content: "└─ ";
  }

  tr.override:has(+ .override) > :global(th)::before {
    content: "├─ ";
  }

  th {
    text-transform: capitalize;
  }
</style>
