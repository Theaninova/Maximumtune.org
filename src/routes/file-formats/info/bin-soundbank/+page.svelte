<script>
  import "$lib/style/table.scss"
</script>

<table>
  <caption>Header</caption>
  <tr>
    <td colspan="4">Signature</td>
    <td colspan="4">u32 <var>count</var></td>
    <td colspan="4">u32 <var>fileSize</var></td>
    <td colspan="4">u32 <var>valueLength</var></td>
  </tr>
  <tr>
    <td style="height: 128px" colspan="16">⇑<br />Data<br />⥥</td>
  </tr>
</table>

<table>
  <caption>Data</caption>
  <tr>
    <td colspan="4">u32 <var>id</var></td>
    <td colspan="12" />
  </tr>
  <tr>
    <td colspan="16">⇑<br />Value String<br />⥥</td>
  </tr>
</table>

<style lang="scss">
  @import "../../../../lib/style/theme.scss";

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
