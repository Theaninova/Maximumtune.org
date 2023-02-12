import Nud from "./kaitai/nud.ksy"
import Mdl from "./kaitai/mdl.ksy"
import {BufferGeometry, Float32BufferAttribute, Uint16BufferAttribute, Uint8BufferAttribute} from "three"
import {inflate} from "pako"

export class Model {
  private _geometry: BufferGeometry[]

  constructor(readonly nud: Nud, readonly id?: number) {}

  get geometry(): BufferGeometry[] {
    this._geometry ||= processNud(this.nud)
    return this._geometry
  }
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

export function processNud(nud: Nud): BufferGeometry[] {
  return nud.polyData.map(({vertices: vertexData, indices: indexData}) => {
    const geometry = new BufferGeometry()

    const indices = getRenderingVertexIndices(indexData)
    geometry.index = new Uint16BufferAttribute(indices, 1)
    const vertices = vertexData.map(it => it.vertex.values)
    geometry.setAttribute("position", new Float32BufferAttribute(vertices.flat(), vertices[0].length))

    if (vertexData[0].uvChannels?.[0]) {
      const uvs = vertexData.map(it => it.uvChannels[0].values)
      geometry.setAttribute("uv", new Float32BufferAttribute(uvs.flat().map(halfFloatToFloat), uvs[0].length))
    }
    if (vertexData[0].colors) {
      const colors = vertexData.map(it => it.colors.values)
      geometry.setAttribute("color", new Uint8BufferAttribute(colors.flat(), colors[0].length))
    }

    geometry.computeBoundingSphere()
    geometry.computeBoundingBox()
    geometry.computeVertexNormals()
    geometry.computeTangents()

    return geometry
  })
}

export async function loadNud(file: File): Promise<Model[]> {
  const models: Model[] = []

  switch (file.name.replace(/^[^.]+/, "")) {
    case ".mdl": {
      const decompressed = inflate(await file.arrayBuffer()) as Uint8Array
      models.push(...new Mdl(decompressed.buffer).models.map(({nud, id}) => new Model(nud, id as number)))
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
