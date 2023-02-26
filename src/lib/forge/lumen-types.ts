export interface LumenType<T extends string> {
  type: T
}

export interface LumenTexture extends LumenType<"texture"> {
  name: string
  imageData: ImageData
  dataUrl?: string
}

export interface LumenPositionalData {
  x: number
  y: number
}

export interface LumenBoundsData extends LumenPositionalData {
  width: number
  height: number
}

export type LumenPlaceableTypes = LumenShape | LumenSprite

export interface LumenPosition extends LumenType<"position">, LumenPositionalData {}

export interface LumenPlaceable {
  id: number
}

export interface LumenShape extends LumenType<"shape">, LumenPlaceable {
  bounds: LumenBounds
  graphics: LumenGraphics[]
}

export interface LumenBounds extends LumenType<"bounds">, LumenBoundsData {}

export interface LumenGraphics extends LumenType<"graphics">, LumenBoundsData {
  texture: LumenTexture
}

export type LumenActionTypes =
  | LumenPlaceObjectAction
  | LumenMoveObjectAction
  | LumenRemoveObjectAction
  | LumenDoAction

export interface LumenDoAction extends LumenType<"do action"> {
  // TODO
  actionId: number
}

export interface LumenPlaceObjectAction extends LumenType<"place object"> {
  id: number
  object: LumenPlaceableTypes
  name: string
  depth: number
  position?: LumenPosition
  transform?: string
}

export interface LumenMoveObjectAction extends LumenType<"move object"> {
  depth: number
  position?: LumenPosition
  transform?: string
  // TODO:
  // - Blend mode
  // - color mix
  // - position flags
  // - ...
}

export interface LumenRemoveObjectAction extends LumenType<"remove object"> {
  /**
   * Spec allows for only one object per depth layer, so this can be used as a guaranteed unique id
   */
  depth: number
}

export interface LumenFrame extends LumenType<"frame">, LumenPlaceable {
  actions: LumenActionTypes[]
}

export type LumenKeyframe = LumenType<"keyframe">

export interface LumenSprite extends LumenType<"sprite">, LumenPlaceable {
  keyframes: LumenKeyframe[]
  frames: LumenFrame[]
}
