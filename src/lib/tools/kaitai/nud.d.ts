export interface NudType {
  polyData: PolyData[]
}

export interface PolyData {
  indices: number[]
  vertices: VertexData[]
}

export interface VertexData {
  vertex: Vector<2>
  colors: Vector<4>
  uvChannels: Vector<2>[]
}

export interface Vector<N extends 2 | 3 | 4> {
  values: N extends 1
    ? [number]
    : N extends 2
    ? [number, number]
    : N extends 3
    ? [number, number, number]
    : [number, number, number, number]
}
