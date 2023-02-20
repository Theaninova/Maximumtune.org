<script>
  import {readBinSoundbank} from "$lib/tools/formats/bin_soundbank/bin-soundbank.js"
  import "$lib/style/table.scss"
  import {readBinToneMap} from "$lib/tools/formats/bin_soundbank/bin-tone-map.js"

  async function fileChange() {
    file = await input.files.item(0).arrayBuffer()
  }

  let file
  let input
  $: soundBank = file && fileType === "sound_bank" ? readBinSoundbank(file) : undefined
  $: toneMap = file && fileType === "tone_map" ? readBinToneMap(file) : undefined
  /** @type {"sound_bank" | "tone_map"} */
  let fileType = "sound_bank"
</script>

<svelte:head>
  <title>.BIN Soundbank Editor</title>
  <meta name="description" content="Viewer and editor for the .bin sound bank file format" />
</svelte:head>

<h1>.BIN Soundbank Editor</h1>

<p><em>Export is coming later</em></p>

<form>
  <input bind:this={input} on:change={fileChange} accept=".bin" type="file" name="filename" />
  <input bind:group={fileType} type="radio" id="soundBank" name="bank_type" value="sound_bank" />
  <label for="soundBank">Sound Bank</label>
  <input bind:group={fileType} type="radio" id="toneMap" name="bank_type" value="tone_map" />
  <label for="toneMap">Tone Map</label>
</form>

{#if soundBank}
  <table>
    {#each soundBank.data as [key, value]}
      <tr>
        <th>{key}</th>
        <td>{value}</td>
      </tr>
    {/each}
  </table>
{/if}

{#if toneMap}
  <table>
    <caption>{toneMap.name} ({toneMap.id})</caption>
    {#each toneMap.data as [key, value]}
      <tr>
        <th>{key}</th>
        <td>{value}</td>
      </tr>
    {/each}
  </table>
{/if}

<footer>
  <p>
    More info <a href="/file-formats/info/bin-soundbank">soundbank</a> and
    <a href="/file-formats/info/bin-tonemap">Tone map</a>
  </p>
</footer>

<style>
  td {
    text-align: center;
  }
</style>
