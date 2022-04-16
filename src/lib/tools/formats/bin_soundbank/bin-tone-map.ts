import {readZeroTerminatedString} from "./bin-soundbank"

export interface BinToneMap {
  count: number
  keyLength: number
  valueLength: number
  fileSize: number
  name: string
  id: number
  data: [string, string][]
}

export function readBinToneMap(buffer: ArrayBuffer): BinToneMap {
  const view = new DataView(buffer)
  const signature = view.getUint32(0x00, true)
  if (signature !== 0x01) {
    throw new Error(`Invalid signature ${signature.toString(16)}`)
  }

  const id = view.getUint32(0x04, true)
  const count = view.getUint32(0x08, true)
  const fileSize = view.getUint32(0x0c, true)
  const keyLength = view.getUint32(0x10, true)
  const valueLength = view.getUint32(0x14, true)
  const dataStart = 0x40
  const sectionLength = valueLength + keyLength

  return {
    id,
    count,
    keyLength,
    valueLength,
    fileSize,
    name: readZeroTerminatedString(view, 0x20),
    data: Array.from({length: count}, (_, i) => [
      readZeroTerminatedString(view, dataStart + i * sectionLength),
      readZeroTerminatedString(view, dataStart + i * sectionLength + keyLength),
    ]),
  }
}
