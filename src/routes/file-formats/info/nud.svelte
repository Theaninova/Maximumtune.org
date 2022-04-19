<script>
  import "../../../lib/style/table.scss"
</script>

<table>
  <caption>.NUD Model</caption>
  <tr>
    <td style="height: 128px" colspan="16">⇑<br /><a href="#header">Header</a><br />⥥</td>
  </tr>
  <tr>
    <td style="height: 128px" colspan="16">⇑<br /><a href="#polygons">Polygons</a><br />⥥</td>
  </tr>
  <tr>
    <td style="height: 128px" colspan="16">⇑<br /><a href="#indices">Indices</a><br />⥥</td>
  </tr>
  <tr>
    <td style="height: 128px" colspan="16">⇑<br /><a href="#vertices">Vertices</a><br />⥥</td>
  </tr>
  <tr>
    <td colspan="16">name</td>
  </tr>
</table>

<table>
  <caption id="header">Header</caption>
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
  <tr><td colspan="16">?</td> </tr>
</table>

<table>
  <caption id="polygons">Polygons</caption>
  <tr>
    <td style="height: 64px" colspan="16">?</td>
  </tr>
  <tr>
    <td colspan="8" />
    <td colspan="2">0xFFFF</td>
    <td colspan="2">u16 <var>polyCount</var></td>
    <td colspan="4">u32 <var>polyDataLength</var></td>
  </tr>
  <tr>
    <td style="height: 128px" colspan="16">⇑<br /><a href="#polygon-info">Polygon Info</a><br />⥥</td>
  </tr>
  <tr>
    <td style="height: 128px" colspan="16">⇑<br /><a href="#polygon-data">Polygon Data</a><br />⥥</td>
  </tr>
</table>

<table>
  <caption id="polygon-info">Polygon Info</caption>
  <tr>
    <td colspan="4">u32 <var>indexOffset</var></td>
    <td colspan="4">u32 <var>vertexOffset</var></td>
    <td colspan="4" />
    <td colspan="2">u16 <var>vertCount</var></td>
    <td colspan="2">u16 <var>?</var></td>
  </tr>
  <tr>
    <td colspan="4">u32 <var>polyDataStart?</var></td>
    <td colspan="12" />
  </tr>
  <tr>
    <td colspan="4">u32 <var>indexCount?</var></td>
    <td colspan="12" />
  </tr>
</table>

<table>
  <caption id="polygon-data">Polygon Data</caption>
  <tr>
    <td style="height: 160px" colspan="16">?</td>
  </tr>
  <tr><td colspan="16">0</td></tr>
</table>

<table>
  <caption id="n-gon">N-Gon</caption>
  <tr>
    <td colspan="14">⟸ u16 ⟹</td>
    <td colspan="2">0xFFFF</td>
  </tr>
</table>

<table>
  <caption id="indices">Indices</caption>
  <tr>
    <td style="height: 128px" colspan="16">⇑<br /><a href="#n-gon">N-Gons</a><br />⥥</td>
  </tr>
</table>

<table>
  <caption id="vertex">Vertex</caption>
  <tr>
    <td colspan="4">f32 <var>posX</var></td>
    <td colspan="4">f32 <var>posY</var></td>
    <td colspan="4">f32 <var>posZ</var></td>
    <td colspan="4">f32 <var>?</var></td>
    <td colspan="4">f32 <var>?</var></td>
    <td colspan="4">f32 <var>?</var></td>
    <td colspan="4">u32 <var>?</var></td>
  </tr>
</table>

<table>
  <caption id="vertices">Vertices</caption>
  <tr>
    <td style="height: 128px" colspan="16">⇑<br /><a href="#vertex">vertices</a><br />⥥</td>
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
