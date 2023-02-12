import Nud from "./kaitai/nud.ksy"
import {BufferGeometry, Float32BufferAttribute, Uint16BufferAttribute, Uint8BufferAttribute} from "three"
import type {NudType} from "./kaitai/nud"

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

export async function loadNud(file: File): Promise<{geometry: BufferGeometry; nud: NudType}> {
  const nud = new Nud<NudType>(await file.arrayBuffer())
  const vertexData = nud.polyData[0].vertices

  const vertices = vertexData.map(it => it.vertex.values)
  const indices = getRenderingVertexIndices(nud.polyData[0].indices)
  const uvs = vertexData.map(it => it.uvChannels[0].values)
  const colors = vertexData.map(it => it.colors.values)

  const geometry = new BufferGeometry()
  geometry.index = new Uint16BufferAttribute(indices, 1)
  geometry.setAttribute("position", new Float32BufferAttribute(vertices.flat(), vertices[0].length))
  geometry.setAttribute("uv", new Float32BufferAttribute(uvs.flat().map(halfFloatToFloat), uvs[0].length))
  geometry.setAttribute("color", new Uint8BufferAttribute(colors.flat(), colors[0].length))

  geometry.computeBoundingSphere()
  geometry.computeBoundingBox()
  geometry.computeVertexNormals()
  geometry.computeTangents()

  return {geometry, nud}
}
