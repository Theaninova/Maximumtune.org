import {Nud} from "./kaitai/compiled/nud"
import {Mdl} from "./kaitai/compiled/mdl"
import {Xmd} from "./kaitai/compiled/xmd"
import {
  BufferGeometry,
  ClampToEdgeWrapping,
  DoubleSide,
  Float32BufferAttribute,
  LinearFilter,
  LinearMipMapLinearFilter,
  Material,
  MeshPhongMaterial,
  MirroredRepeatWrapping,
  NearestFilter,
  NearestMipmapLinearFilter,
  RepeatWrapping,
  Texture,
  Uint16BufferAttribute,
  Uint8BufferAttribute,
  UVMapping,
} from "three"
import type {TextureFilter, Wrapping} from "three"
import {inflate} from "pako"
import KaitaiStream from "kaitai-struct/KaitaiStream"
import {Nut} from "./kaitai/compiled/nut"
import {getImageData} from "./nut-image-data"
import {filterCar, indexCar} from "./car"

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
  return nud.meshes.flatMap(mesh => {
    return mesh.parts.map((part, i) => {
      const geometry = new BufferGeometry()

      const indices = getRenderingVertexIndices(part.indices)
      geometry.setIndex(new Uint16BufferAttribute(indices, 1))
      const vertices = part.vertices.map(it => it.position)
      geometry.setAttribute("position", new Float32BufferAttribute(vertices.flat(), vertices[0].length))

      if (part.vertices[0].uv) {
        // TODO: more uv channels
        const uvs = part.vertices.map(it => [convertFloat16(it.uv[0]), convertFloat16(it.uv[1])])
        geometry.setAttribute("uv", new Float32BufferAttribute(uvs.flat(), uvs[0].length))
        geometry.attributes.uv.needsUpdate = true
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
      //console.assert(part.materials.length <= 1, "Multiple materials: ", "Model", id, "Polyset", i)
      const nudMaterial = part.materials[0].material
      const material = new MeshPhongMaterial()
      const noTextures = false
      if (noTextures) {
        material.side = DoubleSide
      }

      if (!noTextures) {
        if (mesh.name.includes("NO_SORT")) {
          material.depthWrite = false
          material.depthTest = false
        }
        if (mesh.name.includes("polySurface")) {
          material.transparent = true // nudMaterial.refAlpha !== 0
          material.opacity = 0.05
        }
      }

      // if (!nudMaterial.flags.diffuseMap) {
      //   material.opacity = 0.9
      // }
      // if (nudMaterial.flags.shadow) {
      //   material.opacity = 0
      // }
      if (!noTextures && textures) {
        // console.assert(
        //   nudMaterial.materialTextures.length <= 1,
        //   nudMaterial.materialTextures,
        //   nudMaterial,
        //   mesh.name,
        // )
        for (const texture of nudMaterial.materialTextures.slice(0, 1)) {
          const nutTexture = textures[texture.hash]
          console.assert(!!nutTexture, "Texture not found:", texture.hash, "in", id)
          if (!nutTexture) continue

          const nativeTexture = new Texture(
            getImageData(
              nutTexture.textureData.surfaces.surfaces[0],
              nutTexture.textureInfo.width,
              nutTexture.textureInfo.height,
              nutTexture.textureInfo.pixelFormat,
            ),
            UVMapping,
            convertWrapMode(texture.wrapModeT),
            convertWrapMode(texture.wrapModeS),
            convertFilterMode(texture.magFilter),
            convertFilterMode(texture.minFilter),
          )
          nativeTexture.flipY = false
          nativeTexture.needsUpdate = true

          if (!material.map) {
            material.map = nativeTexture
          } else if (!material.bumpMap) {
            material.bumpMap = nativeTexture
          } else if (!material.specularMap) {
            material.specularMap = nativeTexture
          }
          // if (nudMaterial.flags.diffuseMap && !material.map) {
          //   // TODO
          // } else if (nudMaterial.flags.sphereMap && !material.envMap) {
          //   material.envMap = nativeTexture
          // } else if (nudMaterial.flags.normalMap && !material.normalMap) {
          //   material.bumpMap = nativeTexture
          //   material.bumpScale = 10
          //   console.log("normal", nutTexture.textureInfo)
          // } else if (nudMaterial.flags.dummyRamp && !material.roughnessMap) {
          //   material.roughnessMap = nativeTexture
          // } else if (nudMaterial.flags.glow && !material.emissiveMap) {
          //   material.emissiveMap = nativeTexture
          //   material.emissiveIntensity = 1000
          // }
        }
      }

      return {geometry, material}
    })
  })
}

const debug = true

function convertFilterMode(filter: Nud.FilterMode): TextureFilter {
  return {
    [Nud.FilterMode.LINEAR]: LinearFilter,
    [Nud.FilterMode.NEAREST]: NearestFilter,
    [Nud.FilterMode.LINEAR_MIPMAP_LINEAR]: LinearMipMapLinearFilter,
    [Nud.FilterMode.NEAREST_MIPMAP_LINEAR]: NearestMipmapLinearFilter,
  }[filter]
}

function convertWrapMode(wrapMode: Nud.WrapMode): Wrapping {
  return {
    [Nud.WrapMode.REPEAT]: RepeatWrapping,
    [Nud.WrapMode.CLAMP_TO_EDGE]: ClampToEdgeWrapping,
    [Nud.WrapMode.MIRRORED_REPEAT]: MirroredRepeatWrapping,
  }[wrapMode]
}

export async function loadTex(file: File, pick?: number): Promise<Record<number, Nut.NutBody.Texture>> {
  const decompressed = inflate(await file.arrayBuffer()) as Uint8Array
  const stream = new KaitaiStream(new DataView(decompressed.buffer))
  const xmd = new Xmd(stream)

  const out = {}
  for (let i = 0; i < xmd.header.count; i++) {
    const id = xmd.itemIds[i]
    if (typeof pick !== "undefined" && id !== pick) continue

    const position = xmd.positions[i]
    const size = xmd.lengths[i]
    out[id] = {}

    try {
      const stream = new KaitaiStream(new DataView(decompressed.buffer, position, size))
      const nut = new Nut(stream)

      for (const texture of nut.body.textures) {
        console.assert(!out[id][texture.gidx.hashId], "Duplicate identifier", texture.gidx.hashId)
        out[texture.gidx.hashId] = texture
      }
    } catch (error) {
      console.error(
        "Failed to load NUT as part of an XMD archive, index",
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

  return out
}

export async function loadNud(file: File, textureFile?: {tex: File; pick: number}[]): Promise<Model[]> {
  const models: Model[] = []

  switch (file.name.replace(/^[^.]+/, "")) {
    case ".mdl": {
      const textures = textureFile
        ? await Promise.all(textureFile.map(it => loadTex(it.tex, it.pick))).then(it =>
            it.reduce((acc, curr) => {
              Object.assign(acc, curr)
              return acc
            }),
          )
        : undefined
      const decompressed = inflate(await file.arrayBuffer()) as Uint8Array
      if (debug) {
        const stream = new KaitaiStream(new DataView(decompressed.buffer))
        const xmd = new Xmd(stream)
        const nuds: Nud[] = []
        for (let i = 0; i < xmd.header.count; i++) {
          const id = xmd.itemIds[i]
          const position = xmd.positions[i]
          const size = xmd.lengths[i]

          try {
            const stream = new KaitaiStream(new DataView(decompressed.buffer, position, size))
            nuds.push(new Nud(stream))
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

        models.push(...filterCar(nuds).map(nud => new Model(nud, undefined, textures)))
        indexCar(nuds)
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
