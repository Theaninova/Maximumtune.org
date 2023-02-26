import {inflate} from "pako"
import {Lmd} from "./kaitai/compiled/lmd"
import {Nut} from "./kaitai/compiled/nut"
import KaitaiStream from "kaitai-struct/KaitaiStream"
import {getImageData} from "./nut-image-data"

export class Lumen {
  symbols: string[]

  textures: {name: string; imageData: ImageData; dataUrl?: string}[]

  positions: {x: number; y: number}[]

  transforms: string[]

  width: number

  height: number

  framerate: number

  defines: any[]

  frames: any[] = []

  context: CanvasRenderingContext2D

  constructor(readonly lmd: Lmd, readonly nut: Nut) {
    const tags = lmd.lmb.tags
    for (let i = 0; i < tags.length; i++) {
      const tag = tags[i]
      switch (tag.tagType) {
        case Lmd.Tag.TagType.SYMBOLS: {
          this.symbols = (tag.data as Lmd.Symbols).values.map(it => it.value)
          break
        }
        case Lmd.Tag.TagType.TEXTURE_ATLASES: {
          this.textures = (tag.data as Lmd.TextureAtlases).values.map(it => {
            const textureHash = lmd.textures.textureHashes[it.id]
            const texture = nut.body.textures.find(texture => texture.gidx.hashId === textureHash)
            return {
              name: this.symbols[it.nameId],
              imageData: getImageData(
                texture.textureData.surfaces.surfaces[0],
                texture.textureInfo.width,
                texture.textureInfo.height,
                texture.textureInfo.pixelFormat,
              ),
            }
          })
          break
        }
        case Lmd.Tag.TagType.POSITIONS: {
          const positions = tag.data as Lmd.Positions
          this.positions = positions.values.map(({x, y}) => ({x, y}))
          break
        }
        case Lmd.Tag.TagType.TRANSFORMS: {
          const transforms = tag.data as Lmd.Transforms
          this.transforms = transforms.values.map(
            ({a, b, c, d, x, y}) => `matrix(${a}, ${b}, ${c}, ${d}, ${x}, ${y})`,
          )
          break
        }
        case Lmd.Tag.TagType.PROPERTIES: {
          const data = tag.data as Lmd.Properties
          this.width = data.width
          this.height = data.height
          this.framerate = data.framerate
          break
        }
        case Lmd.Tag.TagType.DEFINES: {
          const defines = tag.data as Lmd.Defines
          const numChildren = defines.numShapes + defines.numSprites + defines.numTexts
          this.defines = []

          for (let j = 0; j < numChildren; j++) {
            const childTag = tags[i + 1 + j]
            switch (childTag.tagType) {
              case Lmd.Tag.TagType.SHAPE: {
                const shape = childTag.data as Lmd.Shape

                const graphics = []
                for (let n = 0; n < shape.numGraphics; n++) {
                  const graphic = tags[i + 1 + j + 1 + n].data as Lmd.Graphic
                  graphics.push({
                    ...graphicToImage(graphic),
                    atlasId: graphic.atlasId,
                    id: shape.characterId,
                  })
                }
                j += shape.numGraphics
                this.defines.push({type: "shape", shape, graphics})

                break
              }
            }
          }

          i += numChildren
          break
        }
        case Lmd.Tag.TagType.SHOW_FRAME: {
          const frame = tag.data as Lmd.Frame

          const actions = []
          for (let j = 0; j < frame.numChildren; j++) {
            const child = tags[i + 1 + j]
            actions.push(child)
          }
          this.frames.push(actions)

          i += frame.numChildren
          break
        }
      }
    }
    this.symbols = (
      lmd.lmb.tags.find(it => it.tagType === Lmd.Tag.TagType.SYMBOLS).data as Lmd.Symbols
    ).values.map(it => it.value)

    lmd.lmb.tags.find(it => it.tagType === Lmd.Tag.TagType.TEXTURE_ATLASES)

    console.log(this, lmd, nut)
  }

  renderTextures(canvas: HTMLCanvasElement) {
    for (const texture of this.textures) {
      canvas.width = texture.imageData.width
      canvas.height = texture.imageData.height
      canvas.getContext("2d").putImageData(texture.imageData, 0, 0)
      texture.dataUrl = canvas.toDataURL("image/png")
    }
  }
}

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
