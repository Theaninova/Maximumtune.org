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
    <td style="height: 128px" colspan="16">⇑<br />Polygons<br />⥥</td>
  </tr>
  <tr>
    <td colspan="16">0</td>
  </tr>
  <tr>
    <td style="height: 128px" colspan="16">⇑<br />Indices<br />⥥</td>
  </tr>
  <tr>
    <td style="height: 128px" colspan="16">⇑<br />Vertices<br />⥥</td>
  </tr>
  <tr>
    <td colspan="16">name</td>
  </tr>
</table>

<table>
  <caption>Polygons</caption>
  <tr>
    <td style="height: 96px" colspan="16">?</td>
  </tr>
  <tr>
    <td colspan="8" />
    <td colspan="2">FF FF</td>
    <td colspan="2">u16 <var>polyCount</var></td>
    <td colspan="4">u32 <var>polyDataLength</var></td>
  </tr>
  <tr>
    <td style="height: 128px" colspan="16">⇑<br />Polygon Info<br />⥥</td>
  </tr>
  <tr>
    <td style="height: 128px" colspan="16">⇑<br />Polygon Data<br />⥥</td>
  </tr>
</table>

<table>
  <caption>Polygon Info</caption>
  <tr>
    <td colspan="4">u32 <var>indexOffset</var></td>
    <td colspan="4">u32 <var>vertexOffset</var></td>
    <td colspan="4" />
    <td colspan="2">u16 <var>vertCount</var></td>
    <td colspan="2">u16 <var>?</var></td>
  </tr>
  <tr>
    <td colspan="4">u32 <var>polyDataStart</var></td>
    <td colspan="12" />
  </tr>
  <tr>
    <td colspan="4">u32 <var>indexCount?</var></td>
    <td colspan="12" />
  </tr>
</table>

<p>Indices are an array of u16s, which form n-gons that are closed up by an index of <code>0xffff</code>.</p>

<p>
  Vertices are an array of u32s, three for the position, three for the uvs (?), and then closed off by a high
  u32 or multiple smaller numbers of unknown purpose.
</p>

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
