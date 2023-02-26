import {Nut} from "./kaitai/compiled/nut"
import dxt from "dxt-js"

export function getImageData(
  surface: Nut.NutBody.TextureSurface,
  width: number,
  height: number,
  format: Nut.PixelFormat,
): ImageData {
  if (!surface) return
  const flags = {
    [Nut.PixelFormat.DXT1]: dxt.flags.DXT1,
    [Nut.PixelFormat.DXT3]: dxt.flags.DXT3,
    [Nut.PixelFormat.DXT5]: dxt.flags.DXT5,
  }[format]

  const decompressed = dxt.decompress(surface.mipmaps as Uint8Array, width, height, flags)
  return new ImageData(new Uint8ClampedArray(decompressed), width, height)
}
