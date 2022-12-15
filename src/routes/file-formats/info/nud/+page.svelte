<script>
  import "../../../../lib/style/table.scss"
</script>

<p>
  This info is in part based on the <a
    href="https://github.com/jam1garner/Smash-Forge/blob/master/Smash%20Forge/Filetypes/Models/Nuds/NUD.cs"
    >SmashForge implementation</a
  > of NUD models
</p>

<table>
  <caption>.NUD Model</caption>
  <tr>
    <td style="height: 128px" colspan="16">⇑<br /><a href="#header">Header</a><br />⥥</td>
  </tr>
  <tr>
    <td style="height: 128px" colspan="16">⇑<br /><a href="#polygons">Parts</a><br />⥥</td>
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
    <td colspan="2">u16 <var>version</var></td>
    <td colspan="2">u16 <var>parts</var></td>
    <td colspan="2">u16 <var>type</var></td>
    <td colspan="2">u16 <var>boneCount</var></td>
  </tr>
  <tr>
    <td colspan="4">u32 <var>partsSize</var></td>
    <td colspan="4">u32 <var>indicesSize</var></td>
    <td colspan="4">u32 <var>verticesSize</var></td>
    <td colspan="4"
      >u32 <var
        ><a
          href="https://github.com/jam1garner/Smash-Forge/blob/c0075bca364366bbea2d3803f5aeae45a4168640/Smash%20Forge/Filetypes/Models/Nuds/NUD.cs#L860"
          >?</a
        ></var
      >
    </td>
  </tr>
  <tr>
    <td colspan="4">f32 <var>boundSphere</var></td>
    <td colspan="4">f32 <var>boundSphere</var></td>
    <td colspan="4">f32 <var>boundSphere</var></td>
    <td colspan="4">f32 <var>boundSphere</var></td>
  </tr>
</table>

<table>
  <caption id="polygons">Polygons</caption>
  <tr>
    <td colspan="4">f32 <var>boundSphere</var></td>
    <td colspan="4">f32 <var>boundSphere</var></td>
    <td colspan="4">f32 <var>boundSphere</var></td>
    <td colspan="4">f32 <var>boundSphere</var></td>
  </tr>
  <tr>
    <td colspan="4">f32 <var>boundSphere</var></td>
    <td colspan="4">f32 <var>boundSphere</var></td>
    <td colspan="4">f32 <var>boundSphere</var></td>
    <td colspan="4">f32 <var>boundSphere</var></td>
  </tr>
  <tr>
    <td colspan="4">0x0000</td>
    <td colspan="4"
      >u32 <var
        ><a
          href="https://github.com/jam1garner/Smash-Forge/blob/c0075bca364366bbea2d3803f5aeae45a4168640/Smash%20Forge/Filetypes/Models/Nuds/NUD.cs#L890"
          >weight</a
        ></var
      >
    </td>
    <td colspan="2">i16 <var>boneIndex</var></td>
    <td colspan="2">u16 <var>polyCount</var></td>
    <td colspan="4">u32 <var>position</var></td>
  </tr>
  <tr>
    <td style="height: 128px" colspan="16">⇑<br /><a href="#polygon-info">Polygon</a><br />⥥</td>
  </tr>
  <tr>
    <td style="height: 128px" colspan="16">⇑<br /><a href="#polygon-data">Material</a><br />⥥</td>
  </tr>
</table>

<table>
  <caption id="polygon-info">Polygon</caption>
  <tr>
    <td colspan="4">u32 <var>indexOffset</var></td>
    <td colspan="4">u32 <var>vertexOffset</var></td>
    <td colspan="4"
      >u32 <var
        ><a
          href="https://github.com/jam1garner/Smash-Forge/blob/c0075bca364366bbea2d3803f5aeae45a4168640/Smash%20Forge/Filetypes/Models/Nuds/NUD.cs#L913"
          >?</a
        ></var
      >
    </td>
    <td colspan="2">u16 <var>vertCount</var></td>
    <td colspan="1">u8 <var><abbr title="0xF0 Bone Type; 0x0F Vertex Type">vert</abbr></var></td>
    <td colspan="1">u8 <var><abbr title=">> 1 UV Count; 0x0F UV Type">uv</abbr></var></td>
  </tr>
  <tr>
    <td colspan="4">u32 <var>textureProp</var></td>
    <td colspan="4">u32 <var>textureProp</var></td>
    <td colspan="4">u32 <var>textureProp</var></td>
    <td colspan="4">u32 <var>textureProp</var></td>
  </tr>
  <tr>
    <td colspan="2">u16 <var><abbr title="Index Count">idxCount</abbr></var></td>
    <td colspan="1">u8 <var><abbr title="Index Size">ixSz</abbr></var></td>
    <td colspan="1">u8 <var><abbr title="Index Flag">ixFl</abbr></var></td>
    <td colspan="12" />
  </tr>
</table>

<p>Bone Types</p>
<ul>
  <li><code>0x00</code> - No Bones</li>
  <li><code>0x10</code> - Float</li>
  <li><code>0x20</code> - Half Float</li>
  <li><code>0x40</code> - Byte</li>
</ul>
<p>For our purposes, we'll treat bones as if they don't exist.</p>

<h3 id="vertex">Vertex Types</h3>
<ul>
  <li><code>0x00</code> - No Normals</li>
  <li><code>0x01</code> - Normals Float</li>
  <li><code>0x03</code> - Normals Tan BiTan Float</li>
  <li>
    <table>
      <caption><code>0x06</code></caption>
      <tr>
        <td colspan="4">f32 <var>posX</var></td>
        <td colspan="4">f32 <var>posY</var></td>
        <td colspan="4">f32 <var>posZ</var></td>
        <td colspan="2">f16 <var>normal</var></td>
        <td colspan="2">f16 <var>normal</var></td>
        <td colspan="2">f16 <var>normal</var></td>
        <td>UV</td>
      </tr>
    </table>
  </li>
  <li><code>0x07</code> - Normals Tan BiTan Half Float</li>
</ul>

<h3>UV Types</h3>

<table>
  <caption><code>0x00</code></caption>
  <tr>
    <td colspan="2">f16 <var>uv</var></td>
    <td colspan="2">f16 <var>uv</var></td>
  </tr>
</table>

<table>
  <caption><code>0x02</code></caption>
  <tr>
    <td colspan="1">u8 <var>color</var></td>
    <td colspan="1">u8 <var>color</var></td>
    <td colspan="1">u8 <var>color</var></td>
    <td colspan="1">u8 <var>color</var></td>
    <td colspan="2">f16 <var>uv</var></td>
    <td colspan="2">f16 <var>uv</var></td>
  </tr>
</table>
<table>
  <caption><code>0x04</code></caption>
  <tr>
    <td colspan="2">f16 <var>color</var></td>
    <td colspan="2">f16 <var>color</var></td>
    <td colspan="2">f16 <var>color</var></td>
    <td colspan="2">f16 <var>color</var></td>
    <td colspan="2">f16 <var>uv</var></td>
    <td colspan="2">f16 <var>uv</var></td>
  </tr>
</table>
<hr />

<table>
  <caption id="polygon-data">Material</caption>
  <tr>
    <td colspan="4">u32 <var>flags</var></td>
    <td colspan="4" />
    <td colspan="2">u16 <var>srcFactor</var></td>
    <td colspan="2">u16 <var>texCount</var></td>
    <td colspan="2">u16 <var>dstFactor</var></td>
    <td colspan="1">u8 <var><abbr title="Alpha Test">aTst</abbr></var></td>
    <td colspan="1">u8 <var><abbr title="Alpha Function">aFn</abbr></var></td>
  </tr>
  <tr>
    <td colspan="2">u16 <var>refAlpha</var></td>
    <td colspan="2">u16 <var>cullMode</var></td>
    <td colspan="4">u32 <var>?</var></td>
    <td colspan="4">u32 <var>unk2</var></td>
    <td colspan="4">u32 <var>zBufferOffset</var></td>
  </tr>
  <tr>
    <td style="height: 128px" colspan="16">⇑<br /><a href="#texture">Texture</a><br />⥥</td>
  </tr>
  <tr>
    <td style="height: 128px" colspan="16"
      >⇑<br /><a href="#material-attribute">Material Attribute</a><br />⥥
    </td>
  </tr>
  <tr>
    <td colspan="16">0</td>
  </tr>
</table>

<table>
  <caption id="texture">Texture</caption>
  <tr>
    <td colspan="4">u32 <var>hash</var></td>
    <td colspan="6" />
    <td colspan="2">u16 mapMode</td>
    <td colspan="1">u8 <abbr title="Wrap Mode S">wrMS</abbr></td>
    <td colspan="1">u8 <abbr title="Wrap Mode T">wrMS</abbr></td>
    <td colspan="1">u8 <abbr title="Min Filter">minF</abbr></td>
    <td colspan="1">u8 <abbr title="Mag Filter">magF</abbr></td>
  </tr>
  <tr>
    <td colspan="1">u8 <abbr title="Mip Detail">mipD</abbr></td>
    <td colspan="1">?</td>
    <td colspan="4" />
    <td colspan="4">u32 <var>?</var></td>
  </tr>
</table>

<table>
  <caption id="material-attribute">Material Attribute</caption>
  <tr>
    <td colspan="4">u32 <var>size</var></td>
    <td colspan="4">u32 <var>nameStart</var></td>
    <td colspan="3" />
    <td colspan="1">u8 <var><abbr title="Value Count">valC</abbr></var></td>
    <td colspan="4" />
  </tr>
</table>

<table>
  <caption>Material Property (?)</caption>
  <tr>
    <td colspan="4">f32 <var>materialProperty</var></td>
    <td colspan="4">f32 <var>materialProperty</var></td>
    <td colspan="4">f32 <var>materialProperty</var></td>
    <td colspan="4">f32 <var>materialProperty</var></td>
  </tr>
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
