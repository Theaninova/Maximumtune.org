export interface Nud {
  header: NudHeader
  polygons: Polygons
  indices: NGon[]
  vertices: Vertex[]
}

export type NGon = number[]

export interface NudHeader {
  totalLength: number
  polygonsLength: number
  indicesLength: number
  verticesLength: number
}

export interface Polygons {
  polyCount: number
  polyDataLength: number
  polygonInfo: PolygonInfo[]
  // polygonData: unknown
}

export interface PolygonInfo {
  indexOffset: number
  vertexOffset: number
  vertexCount: number
  polygonDataStart: number
  indexCount: number
}

export interface Vertex {
  position: [number, number, number]
  normal: [number, number, number]
}

export function parseNud(buffer: ArrayBuffer): Nud {
  const view = new DataView(buffer)
  if (view.getUint32(0, true) !== 0x4e_44_57_44) {
    throw new Error("Invalid NUD file")
  }

  const header: NudHeader = {
    totalLength: view.getUint32(0x4, true),
    polygonsLength: view.getUint32(0x10, true),
    indicesLength: view.getUint32(0x14, true),
    verticesLength: view.getUint32(0x18, true),
  }

  const polygonsPart: Pick<Polygons, "polyCount" | "polyDataLength"> = {
    polyCount: view.getUint16(0x5a, true),
    polyDataLength: view.getUint32(0x5c, true),
  }

  const polygonInfo: PolygonInfo[] = Array.from({length: polygonsPart.polyCount}, (_, i) => {
    const offset = 0x60 + i * 0x30

    return {
      indexOffset: view.getUint32(offset, true),
      vertexOffset: view.getUint32(offset + 0x4, true),
      vertexCount: view.getUint16(offset + 0xc, true),
      polygonDataStart: view.getUint32(offset + 0x10, true),
      indexCount: view.getUint32(0x20, true),
    }
  })

  const polygons: Polygons = {
    ...polygonsPart,
    polygonInfo,
  }

  const indices = new Uint16Array(buffer, 0x30 + header.polygonsLength, header.indicesLength)
    .reduce(
      (ngons, current) => {
        if (current === 0xff_ff) {
          ngons.push([])
        } else {
          ngons[ngons.length - 1].push(current)
        }
        return ngons
      },
      [[]] as NGon[],
    )
    .slice(0, -1)

  const vertices = new Float32Array(
    buffer,
    0x30 + header.polygonsLength + header.indicesLength,
    header.verticesLength,
  ).reduce((vertices, current, i, array) => {
    if (i % 7 === 0) {
      vertices.push({
        position: [current, array[i + 1], array[i + 2]],
        normal: [array[i + 3], array[i + 4], array[i + 5]],
        // last value is weird
      })
    }
    return vertices
  }, [] as Vertex[])

  return {
    header,
    polygons,
    indices,
    vertices,
  }
}
