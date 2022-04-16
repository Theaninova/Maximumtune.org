export interface BinSoundbank {
  count: number
  valueLength: number
  fileSize: number
  data: [number, string][]
}

export function readZeroTerminatedString(view: DataView, offset: number): string {
  let string_ = ""
  for (let i = offset; view.getUint8(i) !== 0x00; i++) {
    string_ += String.fromCodePoint(view.getUint8(i))
  }
  return string_
}

export function readBinSoundbank(buffer: ArrayBuffer): BinSoundbank {
  const view = new DataView(buffer)
  const signature = view.getUint32(0x00, true)
  if (signature !== 0x01) {
    throw new Error(`Invalid signature ${signature.toString(16)}`)
  }

  const count = view.getUint32(0x04, true)
  const fileSize = view.getUint32(0x08, true)
  const valueLength = view.getUint32(0x0c, true)
  const keyLength = 0x10
  const dataStart = 0x10
  const sectionLength = valueLength + keyLength

  return {
    count,
    valueLength,
    fileSize,
    data: Array.from({length: count}, (_, i) => [
      view.getUint32(dataStart + i * sectionLength, true),
      readZeroTerminatedString(view, dataStart + i * sectionLength + keyLength),
    ]),
  }
}
