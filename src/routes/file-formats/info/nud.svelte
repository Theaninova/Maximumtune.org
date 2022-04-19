<script>
  import "../../../lib/style/table.scss"
</script>

<table>
  <caption>Header</caption>
  <tr>
    <td colspan="4">Signature (NDWD)</td>
    <td colspan="4">u32 <var>listCount</var></td>
    <td colspan="4">u32 <var>listCount</var></td>
    <td colspan="4">u32 <var>count</var></td>
  </tr>
  <tr>
    <td style="height: 128px" colspan="16">⇑<br />positions<br />⥥</td>
  </tr>
</table>

<style lang="scss">
  @import "../../../lib/style/theme.scss";

  table {
    table-layout: fixed;
    border-collapse: collapse;
  }

  td {
    border: 1px solid $color-outline;
    height: 32px;
    font-family: monospace;
    text-align: center;
  }
</style>
