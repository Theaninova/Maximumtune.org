<script lang="ts">
  import {getData, getHeaders} from "../../lib/tools/formats/nub/nub-converter"
  import {bufferToWave} from "../../lib/tools/formats/nub/wav"

  async function fileChange() {
    const file = await input.files.item(0).arrayBuffer()
    const headers = getHeaders(file)
    const data = getData(file, headers)
    blobUrl = URL.createObjectURL(bufferToWave(data.buffer, data.size))
  }

  async function download() {
    const a = document.createElement("a")
    a.href = blobUrl
    a.download = input.files[0].name.replace(/nub$/, "wav")
    a.click()
  }

  let blobUrl: string
  let input: HTMLInputElement
</script>

<svelte:head>
  <title>.NUB Converter</title>
  <meta name="description" content="File viewer and converter for the .nub image file format" />
</svelte:head>

<h1>.NUB Converter</h1>

<p>This tool is capable of playing and converting (some) .nub files</p>

<form>
  <input bind:this={input} on:change={fileChange} accept=".nub" type="file" name="filename" />
  <input type="submit" value="Download WAV" on:click={download} />
</form>

<audio src={blobUrl} controls />

<footer>
  <p>
    As always, the source code is available on <a
      href="https://github.com/Theaninova/mmtorg/blob/master/src/lib/tools/formats/nub/nub-converter.ts"
      >GitHub</a
    >
  </p>
</footer>
