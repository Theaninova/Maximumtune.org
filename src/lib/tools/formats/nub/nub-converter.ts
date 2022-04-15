export interface WavHeader {
  offset: number
  format: number
  channels: number
  dataSize: number
  sampleRate: number
  bytesPerSecond: number
  blockAlign: number
  bitsPerSample: number
  maxValue: number
  loopStart: number
  loopLength: number
}

const wavDataHeaderOffset = 0xbc

export type BinaryNumber = {
  offset: number
  type: `${"Uint" | "Int"}${8 | 16 | 32}`
  endian: "big" | "little"
}

export const userEditable: Record<keyof WavHeader, boolean> = {
  offset: false,
  format: false,
  channels: false,
  dataSize: false,
  sampleRate: false,
  bytesPerSecond: false,
  blockAlign: false,
  bitsPerSample: false,
  maxValue: false,
  loopStart: true,
  loopLength: true,
}

export const offsets: Record<Exclude<keyof WavHeader, "offset">, BinaryNumber> = {
  bitsPerSample: {offset: wavDataHeaderOffset + 0x0e, type: "Uint16", endian: "little"},
  blockAlign: {offset: wavDataHeaderOffset + 0x0c, type: "Uint16", endian: "little"},
  bytesPerSecond: {offset: wavDataHeaderOffset + 0x08, type: "Uint32", endian: "little"},
  channels: {offset: wavDataHeaderOffset + 0x02, type: "Uint8", endian: "little"},
  dataSize: {offset: 0x14, type: "Uint32", endian: "little"},
  format: {offset: wavDataHeaderOffset, type: "Uint8", endian: "little"},
  loopLength: {offset: 0x24, type: "Uint32", endian: "little"},
  loopStart: {offset: 0x20, type: "Uint32", endian: "little"},
  maxValue: {offset: 0xa8, type: "Uint32", endian: "big"},
  sampleRate: {offset: wavDataHeaderOffset + 0x04, type: "Uint32", endian: "little"},
}

function parseWavHeader(header: ArrayBuffer, offset: number): WavHeader {
  const view = new DataView(header, offset)
  const wavSignature = view.getUint32(0, true)
  if (wavSignature !== 0x00_76_61_77) {
    throw new Error(`Not a WAV file (${wavSignature.toString(16)})`)
  }

  return {
    offset,
    ...Object.entries(offsets).reduce((accumulator, [key, {type, offset, endian}]) => {
      accumulator[key] = view[`get${type}`](offset, endian === "little")
      return accumulator
    }, {} as WavHeader),
  }
}

export function applyWavHeader(header: WavHeader, data: ArrayBuffer) {
  const view = new DataView(data, header.offset)
  for (const [key, value] of Object.entries(offsets)) {
    view[`set${value.type}`](value.offset, header[key], value.endian === "little")
  }
  return data
}

export function getHeaders(nub: ArrayBuffer): WavHeader[] {
  // contains multiple headers
  // find all signatures
  const view = new DataView(nub)
  const signatures = []
  for (let i = 0; i < nub.byteLength - 4; i++) {
    if (view.getUint32(i, true) === 0x00_76_61_77) {
      signatures.push(i)
    }
  }

  return signatures.map(signature => parseWavHeader(nub, signature))
}

export function getData(
  nub: ArrayBuffer,
  headers: WavHeader[],
): {
  buffer: AudioBuffer
  size: number
} {
  const wavHeaderSize = 0xd0
  const bufferAfterHeader = 0x7_00

  const header = headers[0] // TODO: more than one header

  const buffer = new AudioBuffer({
    sampleRate: header.sampleRate,
    numberOfChannels: header.channels,
    length: header.dataSize,
  })
  const bytesPerSample = header.bitsPerSample / 8
  const samples = header.dataSize / header.channels / bytesPerSample
  const channels = Array.from({length: header.channels}, () => new Float32Array(samples))
  const view = new DataView(nub, header.offset + wavHeaderSize + bufferAfterHeader)

  if (![8, 16, 32].includes(header.bitsPerSample)) {
    throw new Error(`Unsupported bits per sample: ${header.bitsPerSample}`)
  }

  for (let sample = 0; sample < samples; sample++) {
    for (let channelIndex = 0; channelIndex < header.channels; channelIndex++) {
      const offset = (sample * header.channels + channelIndex) * bytesPerSample
      channels[channelIndex][sample] = view[`getInt${header.bitsPerSample}`](offset, false) / header.maxValue
    }
  }

  for (const [channelIndex, channel] of channels.entries()) {
    buffer.copyToChannel(channel, channelIndex)
  }

  return {
    buffer: buffer,
    size: samples,
  }
}
