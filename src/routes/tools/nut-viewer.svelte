<script lang="ts">
  import {readNut} from "../../lib/tools/formats/nut/viewer"

  async function fileChange() {
    const file = readNut(await input.files.item(0).arrayBuffer())

    canvas.width = file.header.width
    canvas.height = file.header.height
    canvas.getContext("2d").putImageData(file.image, 0, 0)
  }

  let input: HTMLInputElement
  let canvas: HTMLCanvasElement
</script>

<svelte:head>
  <title>.NUT Viewer</title>
  <meta name="description" content="File viewer and converter for the .nut image file format" />
</svelte:head>

<h1>.NUT Viewer</h1>

<form>
  <input bind:this={input} on:change={fileChange} accept=".nut" type="file" name="filename" />
</form>

<!--suppress CheckEmptyScriptTag -->
<canvas bind:this={canvas} />
