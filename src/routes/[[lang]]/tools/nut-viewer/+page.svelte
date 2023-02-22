<script lang="ts">
  import {Nut} from "../../../../lib/forge/kaitai/compiled/nut"
  import KaitaiStream from "kaitai-struct/KaitaiStream"
  import {getImageData} from "../../../../lib/forge/nut-image-data"

  async function fileChange() {
    const nut = new Nut(new KaitaiStream(await input.files.item(0).arrayBuffer()))
    console.log(nut)
    textures = nut.body.textures
  }

  let textures: Nut.NutBody.Texture[]
  let selected: Nut.NutBody.Texture
  $: {
    if (selected && canvas) {
      const width = selected.textureInfo.width
      const height = selected.textureInfo.height
      console.log(selected)

      canvas.width = width
      canvas.height = height

      const imageData = getImageData(
        selected.textureData.surfaces.surfaces[0],
        width,
        height,
        selected.textureInfo.pixelFormat,
      )
      canvas.getContext("2d").putImageData(imageData, 0, 0)
    }
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

  {#if textures}
    <select bind:value={selected}>
      {#each textures as texture}
        <option value={texture}>{texture.gidx.hashId}</option>
      {/each}
    </select>
  {/if}
</form>

<!--suppress CheckEmptyScriptTag -->
<canvas bind:this={canvas} />
