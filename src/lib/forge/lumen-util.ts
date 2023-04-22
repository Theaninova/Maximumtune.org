import {Lmd} from "./kaitai/compiled/lmd"
import {inflate} from "pako"
import {Nut} from "./kaitai/compiled/nut"
import {Lumen} from "./lumen"
import KaitaiStream from "kaitai-struct/KaitaiStream"
import type {LumenAnimation, LumenMoveObjectAction, LumenTransform} from "./lumen-types"

export function graphicToImage(graphic: Lmd.Graphic) {
  console.assert(
    graphic.vertices.length === 4 && graphic.indices.length === 6,
    "Unsupported non-rectangular graphic!",
  )

  const [v1, v2, v3, v4] = graphic.vertices

  const x1 = Math.min(v1.x, v2.x, v3.x, v4.x)
  const x2 = Math.max(v1.x, v2.x, v3.x, v4.x)
  const y1 = Math.min(v1.y, v2.y, v3.y, v4.y)
  const y2 = Math.max(v1.y, v2.y, v3.y, v4.y)

  return {
    x: x1,
    y: y1,
    width: Math.abs(x2 - x1),
    height: Math.abs(y2 - y1),
  }
}

export async function loadLumen(lumen: File, textures?: File, canvas?: HTMLCanvasElement): Promise<Lumen> {
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
  const lumenObject = new Lumen(lmd, nut)

  if (canvas) {
    lumenObject.renderTextures(canvas)
  }

  return lumenObject
}

export function decomposeMatrix(matrix: Lmd.Transforms.Matrix): LumenTransform {
  const rotation = Math.atan2(matrix.b, matrix.a)
  return {
    scale: [Math.sqrt(matrix.a ** 2 + matrix.b ** 2), Math.sqrt(matrix.c ** 2 + matrix.d ** 2)],
    rotate: (rotation * 180) / Math.PI,
    skewY: Math.atan2(matrix.d, matrix.c) - Math.PI / 2 - rotation,
    translate: [matrix.x, matrix.y],
  }
}

export function framesToLumenAnimation(
  frames: Array<LumenMoveObjectAction | undefined>,
  type: LumenAnimation["interpolation"],
  framerate: number,
  delayBefore: number,
  delayAfter: number,
  precision = 3,
): LumenAnimation[] {
  const length = frames.length + delayBefore + delayAfter
  const duration = length / framerate || 0
  const delay = delayBefore / length || 0

  return [
    frames.map(it => (it?.position ? {position: [it.position.x, it.position.y]} : undefined)),
    frames.map(it => it?.transform),
  ].flatMap(frames => {
    let keys = frames.map((it, i) => [it, (i + delay) / length || 0] as const).filter(([it]) => !!it)
    if (keys.length === 0) return []

    if (keys[0] && keys[0][1] !== 0) {
      keys = [[keys[0][0], 0], ...keys]
    }
    if (keys[keys.length - 1] && keys[keys.length - 1][1] !== 1) {
      keys.push([keys[keys.length - 1][0], 1] as const)
    }

    const keyTimes = keys.map(([, i]) => i.toFixed(precision))

    const keyframes = keys
      .map(([it]) => it)
      .reduce<Record<string, string[]>>((acc, curr) => {
        for (const [name, value] of Object.entries(curr)) {
          acc[name] ||= []
          acc[name].push(
            name === "rotate"
              ? `${(value as number).toFixed(precision)} 0 0`
              : Array.isArray(value)
              ? value.map(it => it.toFixed(precision)).join(" ")
              : (value as number).toFixed(precision),
          )
        }
        return acc
      }, {})

    return Object.entries(keyframes).map(([name, values]) => ({
      duration,
      key: name as keyof LumenTransform,
      interpolation: type,
      keyTimes: keyTimes,
      values,
      type: "animation",
    }))
  })
}
