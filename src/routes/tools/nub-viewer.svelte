<script lang="ts">
  import {getData, getHeaders} from "../../lib/tools/formats/nub/nub-converter"
  import {bufferToWave} from "../../lib/tools/formats/nub/wav"

  async function fileChange() {
    const file = await input.files.item(0).arrayBuffer()
    const headers = getHeaders(file)
    console.log(headers)

    const context = new AudioContext()
    const node = context.createBufferSource()
    node.buffer = getData(file, headers).buffer
    node.connect(context.destination)
    node.start()
  }

  async function convert() {
    const file = await input.files.item(0).arrayBuffer()
    const headers = getHeaders(file)
    const data = getData(file, headers)
    const blob = bufferToWave(data.buffer, data.size)
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = "output.wav"
    a.click()
  }

  let input: HTMLInputElement
</script>

<svelte:head>
  <title>.NUB Viewer</title>
  <meta name="description" content="File viewer and converter for the .nub image file format" />
</svelte:head>

<h1>.NUB Viewer</h1>

<form>
  <input bind:this={input} on:change={fileChange} accept=".nub" type="file" name="filename" />
  <input type="submit" value="Convert to wav" on:click={convert} />
</form>
