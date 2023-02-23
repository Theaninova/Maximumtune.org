import {Nud} from "./kaitai/compiled/nud"
import {Mdl} from "./kaitai/compiled/mdl"
import {Xmd} from "./kaitai/compiled/xmd"
import {
  BufferGeometry,
  Float32BufferAttribute,
  Material,
  MeshBasicMaterial,
  RepeatWrapping,
  Texture,
  Uint16BufferAttribute,
  Uint8BufferAttribute,
} from "three"
import {inflate} from "pako"
import KaitaiStream from "kaitai-struct/KaitaiStream"
import type {Nut} from "./kaitai/compiled/nut"
import {getImageData} from "./nut-image-data"

export class Model {
  readonly polysets: Polyset[]

  constructor(
    readonly nud: Nud,
    readonly id?: number,
    readonly textures?: Record<number, Nut.NutBody.Texture>,
  ) {
    this.polysets = processNud(this.nud, this.id, this.textures)
  }
}

export interface Polyset {
  geometry: BufferGeometry
  material: Material
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

export function convertFloat16(raw: number): number {
  const uint32 = new Uint32Array(1)
  uint32[0] = ((raw & 0x8000) << 16) | (((raw & 0x7c00) + 0x1c000) << 13) | ((raw & 0x03ff) << 13)
  const float32 = new Float32Array(uint32.buffer)
  return float32[0]
}

export function processNud(nud: Nud, id?: number, textures?: Record<number, Nut.NutBody.Texture>): Polyset[] {
  return nud.meshes.flatMap(it => {
    return it.parts.map((part, i) => {
      const geometry = new BufferGeometry()

      const indices = getRenderingVertexIndices(part.indices)
      geometry.setIndex(new Uint16BufferAttribute(indices, 1))
      const vertices = part.vertices.map(it => it.position)
      geometry.setAttribute("position", new Float32BufferAttribute(vertices.flat(), vertices[0].length))

      if (part.vertices[0].uv) {
        // TODO: more uv channels
        const uvs = part.vertices.map(it => [convertFloat16(it.uv[0]), convertFloat16(it.uv[1])])
        geometry.setAttribute("uv", new Float32BufferAttribute(uvs.flat(), uvs[0].length))
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
      const material = new MeshBasicMaterial()
      if (part.materials[0].material.alphaTest) {
        material.transparent = true
        material.opacity = 0.4
      }
      // material.color.setHex(Math.random() * 0xff_ff_ff)
      if (textures) {
        for (const texture of part.materials[0].material.materialTextures.slice(0, 1)) {
          const nutTexture = textures[texture.hash]
          console.assert(!!nutTexture, "Texture not found:", texture.hash)
          if (!nutTexture) continue
          material.map = new Texture(
            getImageData(
              nutTexture.textureData.surfaces.surfaces[0],
              nutTexture.textureInfo.width,
              nutTexture.textureInfo.height,
              nutTexture.textureInfo.pixelFormat,
            ),
          )
          material.map.wrapT = RepeatWrapping
          material.map.wrapS = RepeatWrapping
          material.map.needsUpdate = true
        }
      }

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
        const stream = new KaitaiStream(new DataView(decompressed.buffer))
        const xmd = new Xmd(stream)
        for (let i = 0; i < xmd.header.count; i++) {
          const id = xmd.itemIds[i]
          const position = xmd.positions[i]
          const size = xmd.lengths[i]
          try {
            const stream = new KaitaiStream(new DataView(decompressed.buffer, position, size))
            models.push(new Model(new Nud(stream), id))
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
        const stream = new KaitaiStream(decompressed)
        models.push(...new Mdl(stream).models.map(({nud, id}) => new Model(nud, id as number)))
      }
      break
    }
    case ".nud": {
      const stream = new KaitaiStream(new DataView(await file.arrayBuffer()))
      models.push(new Model(new Nud(stream)))
      break
    }
    default: {
      throw new Error(`Unsupported file ${file.name}`)
    }
  }

  return models
}
