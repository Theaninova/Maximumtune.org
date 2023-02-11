<script>
  import "$lib/style/table.scss"
</script>

<table>
  <caption>Header</caption>
  <tr>
    <td colspan="4">Signature</td>
    <td colspan="4">u32 <var>id</var></td>
    <td colspan="4">u32 <var>count</var></td>
    <td colspan="4">u32 <var>fileSize</var></td>
  </tr>
  <tr>
    <td colspan="4">u32 <var>valueLength?</var></td>
    <td colspan="4">u32 <var>titleLength?</var></td>
    <td colspan="8" />
  </tr>
  <tr>
    <td colspan="16">⇑<br />Title String<br />⥥</td>
  </tr>
  <tr>
    <td style="height: 128px" colspan="16">⇑<br />Data<br />⥥</td>
  </tr>
</table>

<table>
  <caption>Data</caption>
  <tr>
    <td colspan="16">⇑<br />Key String<br />⥥</td>
  </tr>
  <tr>
    <td colspan="16">⇑<br />Value String<br />⥥</td>
  </tr>
</table>

<style lang="scss">
  @import "../../../../lib/style/theme";

  table {
    table-layout: fixed;
    border-collapse: collapse;
  }

  td {
    height: 32px;
    font-family: monospace;
    text-align: center;
    border: 1px solid $color-outline;
  }
</style>
