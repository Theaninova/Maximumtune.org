<script>
  import "../../../lib/style/table.scss"
</script>

<table>
  <caption>Header</caption>
  <tr>
    <td colspan="4">Signature (NDWD)</td>
    <td colspan="4">u32 <var>totalLength</var></td>
    <td colspan="2">u16 <var>?</var></td>
    <td colspan="2">u16 <var>?</var></td>
    <td colspan="4" />
  </tr>
  <tr>
    <td colspan="4">u32 <var>lengthSection1</var></td>
    <td colspan="4">u32 <var>lengthSection2</var></td>
    <td colspan="4">u32 <var>lengthSection3</var></td>
    <td colspan="4" />
  </tr>
  <tr>
    <td style="height: 128px" colspan="16">⇑<br />section1<br />⥥</td>
  </tr>
  <tr>
    <td colspan="16">0</td>
  </tr>
  <tr>
    <td style="height: 128px" colspan="16">⇑<br />section2<br />⥥</td>
  </tr>
  <tr>
    <td style="height: 128px" colspan="16">⇑<br />section3<br />⥥</td>
  </tr>
  <tr>
    <td colspan="16">name</td>
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
