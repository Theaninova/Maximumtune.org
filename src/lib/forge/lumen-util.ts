import {Lmd} from "./kaitai/compiled/lmd"
import {inflate} from "pako"
import {Nut} from "./kaitai/compiled/nut"
import {Lumen} from "./lumen"
import KaitaiStream from "kaitai-struct/KaitaiStream"

export function graphicToImage(graphic: Lmd.Graphic) {
  console.assert(
    graphic.vertices.length === 4 && graphic.indices.length === 6,
    "Unsupported non-rectangular graphic!",
  )

  const v1 = graphic.vertices[0]
  const v2 = graphic.vertices[3]

  const x1 = Math.min(v1.x, v2.x)
  const x2 = Math.max(v1.x, v1.x)
  const y1 = Math.min(v1.y, v2.y)
  const y2 = Math.max(v1.y, v1.y)

  return {
    x: x1,
    y: y1,
    width: Math.abs(x2),
    height: Math.abs(y2),
  }
}

export async function loadLumen(lumen: File, textures?: File): Promise<Lumen> {
  if (!lumen) return
  let lumenFile = await lumen.arrayBuffer()
  try {
    lumenFile = inflate(lumenFile).buffer
  } catch {
    // not compressed
  }
  const lmd = new Lmd(new KaitaiStream(lumenFile))
  let nut
  if (textures) {
    let textureFile = await textures.arrayBuffer()
    try {
      textureFile = inflate(textureFile).buffer
    } catch {
      // not compressed
    }
    nut = new Nut(new KaitaiStream(textureFile))
  }
  return new Lumen(lmd, nut)
}
