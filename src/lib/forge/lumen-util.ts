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
  precision = 3,
): LumenAnimation[] {
  const duration = frames.length / framerate
  let keys = frames
    .map(
      (it, i) =>
        [
          it?.position && it?.transform
            ? {...it.transform, position: [it.position.x, it.position.y]}
            : it?.position
            ? {position: [it.position.x, it.position.y]}
            : it?.transform,
          i / frames.length,
        ] as const,
    )
    .filter(([it]) => !!it)
  if (keys[0] && keys[0][1] !== 0) {
    keys = [
      [
        {
          rotate: 0,
          scale: [0, 0],
          skewY: 0,
          translate: [0, 0],
          position: [0, 0],
        },
        0,
      ],
      ...keys,
    ]
  }
  const keyTimes = keys.map(([, i]) => i.toFixed(precision))

  const keyframes = keys
    .map(([it]) => it)
    .reduce<Record<string, string[]>>((acc, curr) => {
      for (const [name, value] of Object.entries(curr)) {
        acc[name] ||= []
        acc[name].push(
          name === "rotate"
            ? `0 0 ${value.toFixed(precision)}`
            : Array.isArray(value)
            ? value.map(it => it.toFixed(precision)).join(" ")
            : value.toFixed(precision),
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
}
