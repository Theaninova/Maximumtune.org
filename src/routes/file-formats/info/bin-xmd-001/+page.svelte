<script>
  import "$lib/style/table.scss"
</script>

<table>
  <caption>Header</caption>
  <tr>
    <td colspan="8">Signature (XMD.001)</td>
    <td colspan="4">u32 <var>listCount</var></td>
    <td colspan="4">u32 <var>count</var></td>
  </tr>
  <tr>
    <td style="height: 128px" colspan="16">⇑<br />positions<br />⥥</td>
  </tr>
  <tr>
    <td style="height: 128px" colspan="16">⇑<br />lengths<br />⥥</td>
  </tr>
  <tr>
    <td style="height: 128px" colspan="16">⇑<br />?<br />⥥</td>
  </tr>
  <tr>
    <td style="height: 128px" colspan="16">⇑<br /><a href="/file-formats/info/nud">nud data</a><br />⥥</td>
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
