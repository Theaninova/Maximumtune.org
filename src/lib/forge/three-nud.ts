import Nud from "./kaitai/nud.ksy"
import Mdl from "./kaitai/mdl.ksy"
import Xmd from "./kaitai/xmd.ksy"
import {
  BufferGeometry,
  Float32BufferAttribute,
  MeshStandardMaterial,
  Uint16BufferAttribute,
  Uint8BufferAttribute,
} from "three"
import {inflate} from "pako"
import type {Part} from "../../../generated/src/lib/forge/kaitai/nud.ksy"

export class Model {
  readonly polysets: Polyset[]

  constructor(readonly nud: Nud, readonly id?: number) {
    this.polysets = processNud(this.nud, this.id)
  }
}

export interface Polyset {
  geometry: BufferGeometry
  material: MeshStandardMaterial
}

function getRenderingVertexIndices(vertexIndices: number[]): number[] {
  const renderingIndices: number[] = []

  const startDirection = 1
  let p = 0
  let f1 = vertexIndices[p++]
  let f2 = vertexIndices[p++]
  let faceDirection = startDirection
  let f3
  do {
    f3 = vertexIndices[p++]
    if (f3 === 0xff_ff) {
      f1 = vertexIndices[p++]
      f2 = vertexIndices[p++]
      faceDirection = startDirection
    } else {
      faceDirection *= -1
      if (f1 !== f2 && f2 !== f3 && f3 !== f1) {
        if (faceDirection > 0) {
          renderingIndices.push(f3, f2, f1)
        } else {
          renderingIndices.push(f2, f3, f1)
        }
      }
      f1 = f2
      f2 = f3
    }
  } while (p < vertexIndices.length)

  // this.displayFaceSize = renderingIndices.length;
  return renderingIndices
}

export function halfFloatToFloat(half: number): number {
  return ((half & 0x80_00) << 16) | (((half & 0x7c_00) + 0x1_c0_00) << 13) | ((half & 0x03_ff) << 13)
}

export function processNud(nud: Nud, id?: number): Polyset[] {
  return nud.meshes.flatMap(it => {
    return (it.parts as Part[]).map((part, i) => {
      const geometry = new BufferGeometry()

      const indices = getRenderingVertexIndices(part.indices)
      geometry.setIndex(new Uint16BufferAttribute(indices, 1))
      const vertices = part.vertices.map(it => it.position)
      geometry.setAttribute("position", new Float32BufferAttribute(vertices.flat(), vertices[0].length))

      if (part.vertices[0].uv) {
        // TODO: more uv channels
        const uvs = part.vertices.map(it => [it.uv[0], it.uv[1]])
        geometry.setAttribute(
          "uv",
          new Float32BufferAttribute(uvs.flat().map(halfFloatToFloat), uvs[0].length),
        )
      }
      if (part.vertices[0].colors) {
        const colors = part.vertices.map(it => it.colors)
        geometry.setAttribute("color", new Uint8BufferAttribute(colors.flat(), colors[0].length))
      }

      geometry.computeBoundingSphere()
      geometry.computeBoundingBox()
      geometry.computeVertexNormals()

      if (geometry.hasAttribute("uv")) {
        geometry.computeTangents()
      } else {
        console.error("Cannot compute tangents because of missing UV data:", "Model", id, "Polyset", i)
      }

      console.assert(part.boneSize == 0, "Bones are not implemented yet:", "Model", id, "Polyset", i)
      console.assert(part.materials.length <= 1, "Multiple materials: ", "Model", id, "Polyset", i)
      const material = new MeshStandardMaterial()
      if (part.materials[0].material.alphaTest) {
        material.transparent = true
        material.opacity = 0.4
      }
      material.color.setHex(Math.random() * 0xff_ff_ff)
      // for (const texture of materialData[0].material.materialTextures) {
      //   console.log("Requesting texture", texture.hash)
      // }

      return {geometry, material}
    })
  })
}

const debug = true

export async function loadNud(file: File): Promise<Model[]> {
  const models: Model[] = []

  switch (file.name.replace(/^[^.]+/, "")) {
    case ".mdl": {
      const decompressed = inflate(await file.arrayBuffer()) as Uint8Array
      if (debug) {
        const xmd = new Xmd(decompressed.buffer)
        for (let i = 0; i < xmd.header.count; i++) {
          const id = xmd.itemIds[i]
          const position = xmd.positions[i]
          const size = xmd.lengths[i]
          try {
            models.push(new Model(new Nud(decompressed.slice(position, position + size).buffer), id))
          } catch (error) {
            console.error(
              "Failed to load NUD as part of an XMD archive, index",
              i,
              "id",
              id,
              "start",
              position,
              "size",
              size,
              "-",
              error,
            )
          }
        }
      } else {
        models.push(...new Mdl(decompressed.buffer).models.map(({nud, id}) => new Model(nud, id as number)))
      }
      break
    }
    case ".nud": {
      const buffer = await file.arrayBuffer()
      models.push(new Model(new Nud(buffer)))
      break
    }
    default: {
      throw new Error(`Unsupported file ${file.name}`)
    }
  }

  return models
}
