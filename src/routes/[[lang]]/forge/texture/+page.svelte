<script lang="ts">
  import {Nut} from "../../../../lib/forge/kaitai/compiled/nut"
  import KaitaiStream from "kaitai-struct/KaitaiStream"
  import {getImageData} from "../../../../lib/forge/nut-image-data"
  import {inflate} from "pako"
  import {Tex} from "../../../../lib/forge/kaitai/compiled/tex"

  async function fileChange() {
    try {
      let file = await input.files.item(0).arrayBuffer()
      try {
        file = inflate(file)
      } catch {
        // not a compressed file
      }
      if (input.files[0].name.endsWith(".tex")) {
        const tex = new Tex(new KaitaiStream(file))
        nuts = tex.textures.map(it => ({id: it.id, nut: it.nut}))
      } else {
        const nut = new Nut(new KaitaiStream(file))
        nuts = [{id: NaN, nut: nut}]
      }
    } catch (error) {
      console.error(error)
      alert(error)
    }
  }

  let nuts: {id: number; nut: Nut}[]
  let nut: Nut
  $: textures = nut ? nut.body.textures : undefined
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
  let quality = 0.8
  let mimeType = "png"

  $: convertedCanvas = canvas ? canvas.toDataURL(`image/${mimeType}`, quality) : undefined
  const head = "data:image/png;base64,"
  $: fileSize = convertedCanvas ? Math.round(((convertedCanvas.length - head.length) * 3) / 4) : undefined
</script>

<form>
  <input bind:this={input} on:change={fileChange} accept=".nut,.tex" type="file" name="filename" />

  {#if nuts}
    <select bind:value={nut}>
      {#each nuts as { nut, id }}
        <option value={nut}>{id}</option>
      {/each}
    </select>
    /
  {/if}
  {#if textures}
    <select bind:value={selected}>
      {#each textures as texture}
        <option value={texture}>{texture.gidx.hashId}</option>
      {/each}
    </select>

    {#if selected}
      <fieldset>
        <legend
          >{selected.textureInfo.width}x{selected.textureInfo.height} ~{(fileSize / 1000).toFixed(
            1,
          )}kb</legend
        >
        <select bind:value={mimeType}>
          {#each ["webp", "png", "jpeg"] as value}
            <option {value}>{value}</option>
          {/each}
        </select>
        {#if mimeType !== "png"}
          <label><input type="range" bind:value={quality} min="0" max="1" step="0.01" />{quality} </label>
        {/if}
        <a href={convertedCanvas} download="{selected.gidx.hashId}.{mimeType}">download</a>
      </fieldset>
      <img src={convertedCanvas} alt="converted texture" />
    {/if}
  {/if}
</form>
{#if textures}
  <div class="previews">
    {#each textures as texture}{/each}
  </div>
{/if}

<!--suppress CheckEmptyScriptTag -->
<canvas bind:this={canvas} />

<style lang="scss">
  img {
    width: 100%;
    height: 10vh;
    object-fit: none;
    object-position: center;
  }
</style>
