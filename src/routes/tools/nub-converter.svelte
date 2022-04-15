<script lang="ts">
  import {applyWavHeader, getData, getHeaders} from "../../lib/tools/formats/nub/nub-converter"
  import type {WavHeader} from "../../lib/tools/formats/nub/nub-converter"
  import {bufferToWave} from "../../lib/tools/formats/nub/wav"
  import "../../lib/style/table.scss"
  import HeaderEditor from "../../lib/components/nub-editor/HeaderEditor.svelte"

  async function fileChange() {
    file = await input.files.item(0).arrayBuffer()
    headers = getHeaders(file)
    const data = getData(file, headers)
    blobUrl = URL.createObjectURL(bufferToWave(data.buffer, data.size))
  }

  async function download() {
    const a = document.createElement("a")
    a.href = blobUrl
    a.download = input.files[0].name.replace(/nub$/, "wav")
    a.click()
  }

  function alter() {
    const headers = [...form.querySelectorAll("table")].map(table =>
      Object.fromEntries(
        [...table.querySelectorAll("input[type=number]")].map(it => [
          it.name,
          Number(it.value || it.placeholder),
        ]),
      ),
    )

    const buffer = new ArrayBuffer(file.byteLength)
    new Uint8Array(buffer).set(new Uint8Array(file))
    for (const header of headers) {
      applyWavHeader(header, buffer)
    }
    const blob = new Blob([buffer], {type: ".nub"})
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = input.files[0].name
    a.click()
  }

  let file: ArrayBuffer
  let headers: WavHeader[] = []
  let blobUrl: string
  let input: HTMLInputElement
  let form: HTMLFormElement
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

{#if headers.length > 0}
  <form bind:this={form}>
    <button on:click|preventDefault={alter}>Download Changes</button>
    {#each headers as header, i}
      <HeaderEditor {header} title="Header {i}" />
    {/each}
  </form>
{/if}

<footer>
  <p>
    As always, the source code is available on <a
      href="https://github.com/Theaninova/mmtorg/blob/master/src/lib/tools/formats/nub/nub-converter.ts"
      >GitHub</a
    >
  </p>
</footer>
