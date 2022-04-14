/* eslint-disable unicorn/prefer-math-trunc */
export interface NutHeader {
  width: number // uint16
  height: number // uint16
}

export interface NutFile {
  header: NutHeader
  image: ImageData
}

export const key = new Uint8Array([
  0x00, 0x01, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x01, 0x00, 0x00, 0x00, 0x55, 0x55, 0x55, 0x55,
])

export function readNut(buffer: ArrayBuffer): NutFile {
  const signature = String.fromCodePoint(...new Uint8Array(buffer, 0, 4))
  if (signature !== "NTWD") {
    throw new Error(`Invalid nut file with header ${signature}`)
  }

  const headerView = new DataView(buffer, 0, 0x60)
  // const altWidth = headerView.getUint16(0x4c, true)
  const height = headerView.getUint16(0x26, true)
  const width = headerView.getUint16(0x24, true)

  console.log(width, height, buffer.byteLength - 0x60, width * height)

  const clampedData = new Uint8ClampedArray(width * height * 4)
  const data = new Uint32Array(buffer, 0x60, (width * height) / 4)

  for (let i = 0; i < data.byteLength; i++) {
    for (let index = 0; index < 16; index++) {
      clampedData[i * 4 + index] = (data[i] << (index * 2)) & 0xff
    }
  }

  return {
    header: {
      width,
      height,
    },
    image: new ImageData(clampedData, width, height),
  }
}
