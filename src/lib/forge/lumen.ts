import {Lmd} from "./kaitai/compiled/lmd"
import type {Nut} from "./kaitai/compiled/nut"
import {getImageData} from "./nut-image-data"
import type {
  LumenActionTypes,
  LumenBounds,
  LumenDoAction,
  LumenFrame,
  LumenGraphics,
  LumenKeyframe,
  LumenMoveObjectAction,
  LumenPlaceableTypes,
  LumenPlaceObjectAction,
  LumenPosition,
  LumenRemoveObjectAction,
  LumenShape,
  LumenSprite,
  LumenTexture,
} from "./lumen-types"
import {graphicToImage} from "./lumen-util"

type Lazy<T> = () => T

export class Lumen {
  readonly symbols: string[] = []

  readonly textures: LumenTexture[] = []

  readonly positions: LumenPosition[] = []

  readonly colors: string[] = []

  readonly transforms: string[] = []

  readonly bounds: LumenBounds[] = []

  width: number

  height: number

  framerate: number

  readonly defines: Record<number, LumenPlaceableTypes> = {}

  constructor(readonly lmd: Lmd, readonly nut: Nut) {
    for (const tag of lmd.lmb.tags) {
      const value = this.readTag(tag)
      if (value && value.type !== "UNHANDLED") {
        console.error("Unexpected top level return", value)
      }
    }
    console.log(this)
  }

  private readTag(tag: Lmd.Tag) {
    if (!tag.children) {
      console.error("Tag", Lmd.Tag.TagType[tag.tagType], "doesn't have children")
    }
    // this is required because children may rely on objects that have been
    // read before them, as per spec they can depend on anything before
    const children: Lazy<any>[] = tag.children?.map<Lazy<any>>(it => () => this.readTag(it))
    switch (tag.tagType) {
      case Lmd.Tag.TagType.SYMBOLS:
        return this.readSymbols(tag.data as Lmd.Symbols)
      case Lmd.Tag.TagType.TEXTURE_ATLASES:
        return this.readTextureAtlases(tag.data as Lmd.TextureAtlases)
      case Lmd.Tag.TagType.POSITIONS:
        return this.readPositions(tag.data as Lmd.Positions)
      case Lmd.Tag.TagType.TRANSFORMS:
        return this.readTransforms(tag.data as Lmd.Transforms)
      case Lmd.Tag.TagType.PROPERTIES:
        return this.readProperties(tag.data as Lmd.Properties)
      case Lmd.Tag.TagType.DEFINES:
        return this.readDefines(tag.data as Lmd.Defines, children)
      case Lmd.Tag.TagType.SHAPE:
        return this.readShape(tag.data as Lmd.Shape, children)
      case Lmd.Tag.TagType.GRAPHIC:
        return this.readGraphic(tag.data as Lmd.Graphic)
      case Lmd.Tag.TagType.DEFINE_SPRITE:
        return this.readSprite(tag.data as Lmd.DefineSprite, children)
      case Lmd.Tag.TagType.KEYFRAME:
        return this.readKeyframe(tag.data as Lmd.Frame, children)
      case Lmd.Tag.TagType.SHOW_FRAME:
        return this.readFrame(tag.data as Lmd.Frame, children)
      case Lmd.Tag.TagType.COLORS:
        return this.readColors(tag.data as Lmd.Colors)
      case Lmd.Tag.TagType.BOUNDS:
        return this.readBounds(tag.data as Lmd.Bounds)
      case Lmd.Tag.TagType.PLACE_OBJECT:
        return this.readPlaceObject(tag.data as Lmd.PlaceObject)
      case Lmd.Tag.TagType.REMOVE_OBJECT:
        return this.readRemoveObject(tag.data as Lmd.RemoveObject)
      case Lmd.Tag.TagType.DO_ACTION:
        return this.readDoAction(tag.data as Lmd.DoAction)
      case Lmd.Tag.TagType.FRAME_LABEL:
      case Lmd.Tag.TagType.ACTION_SCRIPT:
      case Lmd.Tag.TagType.ACTION_SCRIPT_2:
      case Lmd.Tag.TagType.COLOR_MATRIX:
      case Lmd.Tag.TagType.FONTS:
      case Lmd.Tag.TagType.DYNAMIC_TEXT:
        console.warn(Lmd.Tag.TagType[tag.tagType], "is not implemented yet")
        return {type: "UNHANDLED", unhandledType: Lmd.Tag.TagType[tag.tagType]}
      case Lmd.Tag.TagType.END:
        return
      default:
        console.error("Unhandled tag", Lmd.Tag.TagType[tag.tagType] || tag.tagType)
    }
  }

  private readDoAction(doAction: Lmd.DoAction): LumenDoAction {
    return {
      actionId: doAction.actionId,
      type: "do action",
    }
  }

  private readRemoveObject(removeObject: Lmd.RemoveObject): LumenRemoveObjectAction {
    return {
      depth: removeObject.depth,
      type: "remove object",
    }
  }

  private readPlaceObject(placeObject: Lmd.PlaceObject): LumenPlaceObjectAction | LumenMoveObjectAction {
    if (placeObject.placementMode === Lmd.PlaceObject.PlacementMode.PLACE) {
      return {
        id: placeObject.placementId,
        depth: placeObject.depth,
        name: this.symbols[placeObject.nameId],
        object: this.defines[placeObject.characterId],
        position: this.positions[placeObject.positionId],
        transform: this.transforms[placeObject.positionFlags],
        type: "place object",
      }
    } else {
      return {
        depth: placeObject.depth,
        position: this.positions[placeObject.positionId],
        transform: this.transforms[placeObject.positionFlags],
        type: "move object",
      }
    }
  }

  private readBounds(bounds: Lmd.Bounds) {
    this.bounds.push(
      ...bounds.values.map<LumenBounds>(({x, y, width, height}) => ({
        x,
        y,
        width,
        height,
        type: "bounds",
      })),
    )
  }

  private readColors(colors: Lmd.Colors) {
    this.colors.push(
      ...colors.values.map(
        ({a, r, g, b}) => `#${[r, g, b, a].map(it => Math.max(0, Math.min(255, it)).toString(16)).join("")}`,
      ),
    )
  }

  private readKeyframe(frame: Lmd.Frame, children: Lazy<LumenActionTypes>[]): LumenKeyframe {
    return {
      ...this.readFrame(frame, children),
      type: "keyframe",
    }
  }

  private readFrame(frame: Lmd.Frame, children: Lazy<LumenActionTypes>[]): LumenFrame {
    return {
      id: frame.id,
      actions: children.map(it => it()),
      type: "frame",
    }
  }

  private readSprite(
    sprite: Lmd.DefineSprite,
    children: Array<Lazy<LumenKeyframe | LumenFrame>>,
  ): LumenSprite {
    const processed = children.map(it => it())
    const keyframes = processed.filter(it => it.type === "keyframe") as LumenKeyframe[]
    console.assert(keyframes.length === 0, "Keyframes are not implemented yet")
    const frames = processed.filter(it => it.type === "frame") as LumenFrame[]
    return {
      id: sprite.characterId,
      keyframes,
      frames,
      placedObjects: [
        ...new Set(
          frames
            .flatMap(it => it.actions)
            .filter(it => it.type === "place object")
            .map(it => (it as LumenPlaceObjectAction).object),
        ),
      ],
      // TODO labels
      type: "sprite",
    }
  }

  private readGraphic(graphic: Lmd.Graphic): LumenGraphics {
    return {
      ...graphicToImage(graphic),
      // back referencing like this is per spec allowed as
      // children can only depend on what came before
      texture: this.textures[graphic.atlasId],
      type: "graphics",
    }
  }

  private readShape(shape: Lmd.Shape, children: Lazy<LumenGraphics>[]): LumenShape {
    return {
      id: shape.characterId,
      bounds: this.bounds[shape.boundsId],
      graphics: children.map(it => it()),
      type: "shape",
    }
  }

  private readDefines(_defines: Lmd.Defines, children: Lazy<LumenPlaceableTypes>[]) {
    for (const lazyChild of children) {
      const child = lazyChild()
      this.defines[child.id] = child
    }
  }

  private readProperties(properties: Lmd.Properties) {
    this.width = properties.width
    this.height = properties.height
    this.framerate = properties.framerate
  }

  private readTransforms(transforms: Lmd.Transforms) {
    this.transforms.push(
      ...transforms.values.map(({a, b, c, d, x, y}) => `matrix(${a}, ${b}, ${c}, ${d}, ${x}, ${y})`),
    )
  }

  private readPositions(positions: Lmd.Positions) {
    this.positions.push(...positions.values.map<LumenPosition>(({x, y}) => ({x, y, type: "position"})))
  }

  private readSymbols(symbols: Lmd.Symbols) {
    this.symbols.push(...symbols.values.map(it => it.value))
  }

  private readTextureAtlases(textureAtlases: Lmd.TextureAtlases) {
    this.textures.push(
      ...textureAtlases.values.map<LumenTexture>(it => {
        const textureHash = this.lmd.textures.textureHashes[it.id]
        const texture = this.nut.body.textures.find(texture => texture.gidx.hashId === textureHash)
        return {
          name: this.symbols[it.nameId],
          imageData: getImageData(
            texture.textureData.surfaces.surfaces[0],
            texture.textureInfo.width,
            texture.textureInfo.height,
            texture.textureInfo.pixelFormat,
          ),
          type: "texture",
        }
      }),
    )
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
