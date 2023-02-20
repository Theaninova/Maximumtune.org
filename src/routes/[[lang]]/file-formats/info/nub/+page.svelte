<script>
  import "$lib/style/table.scss"
</script>

<table>
  <caption>Nub header</caption>
  <tr>
    <td colspan="8">Signature</td>
    <td colspan="4">u32 <var>id</var></td>
    <td colspan="4">u32 <var>count</var></td>
  </tr>
  <tr>
    <td colspan="4">u32 <var>headersStart</var></td>
    <td colspan="4">u32 <var>fileSize</var></td>
    <td colspan="4">u32 <var>bits?</var></td>
    <td colspan="4">u32 <var>wavHeaderStart</var></td>
  </tr>
  <tr>
    <td style="height: 64px" colspan="16">⇑<br />#<var>count</var> u32 <var>headerLocations</var><br />⥥</td>
  </tr>
</table>

<table>
  <caption>Wav header</caption>
  <tr>
    <td colspan="8">Signature</td>
    <td colspan="4">u32 <var>index</var></td>
    <td colspan="4" />
  </tr>
  <tr>
    <td colspan="16" />
  </tr>
  <tr>
    <td colspan="4">u32 <var>loopStart</var></td>
    <td colspan="4">u32 <var>loopLength</var></td>
    <td colspan="8" />
  </tr>
  <tr>
    <td colspan="16" />
  </tr>
  <tr>
    <td colspan="4" />
    <td colspan="4">u32 <var>?</var></td>
    <td colspan="8" />
  </tr>
  <tr>
    <td colspan="16" style="height: 160px">⇑<br />5x16<br />⥥</td>
  </tr>
  <tr>
    <td colspan="8" />
    <td colspan="4">u32 big <var>maxValue?</var></td>
    <td colspan="4" />
  </tr>
  <tr>
    <td colspan="12" />
    <td colspan="2">u16 <var>format</var></td>
    <td colspan="2">u16 <var>channels</var></td>
  </tr>
  <tr>
    <td colspan="4">u32 <var>sampleRate</var></td>
    <td colspan="4">u32 <var>bytesPerSecond</var></td>
    <td colspan="2">u16 <var>align</var></td>
    <td colspan="2">u16 <var>bits</var></td>
    <td colspan="4" />
  </tr>
</table>

<style lang="scss">
  @import "../../../../../lib/style/theme";

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
