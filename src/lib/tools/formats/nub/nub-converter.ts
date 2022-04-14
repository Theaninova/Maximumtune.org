export interface WavHeader {
  offset: number
  format: WavFormat
  channels: number
  dataSize: number
  sampleRate: number
  bytesPerSecond: number
  blockAlign: number
  bitsPerSample: number
}

export enum WavFormat {
  PCM = 1,
}

function parseWavHeader(header: ArrayBuffer, offset: number): WavHeader {
  const view = new DataView(header, offset)
  const wavDataHeaderOffset = 0xbc
  const wavSignature = view.getUint32(0, true)
  if (wavSignature !== 0x00_76_61_77) {
    throw new Error(`Not a WAV file (${wavSignature.toString(16)})`)
  }

  return {
    offset: offset,
    dataSize: view.getUint32(0x14, true),
    format: view.getUint8(wavDataHeaderOffset) as WavFormat,
    channels: view.getUint8(wavDataHeaderOffset + 0x02),
    sampleRate: view.getUint32(wavDataHeaderOffset + 0x04, true),
    bytesPerSecond: view.getUint32(wavDataHeaderOffset + 0x08, true),
    blockAlign: view.getUint16(wavDataHeaderOffset + 0x0c, true),
    bitsPerSample: view.getUint16(wavDataHeaderOffset + 0x0e, true),
  }
}

export function getHeaders(nub: ArrayBuffer): WavHeader[] {
  // contains multiple headers
  // find all signatures
  const view = new DataView(nub)
  const signatures = []
  console.log(view.getUint32(0xa0, true).toString(16))
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
  console.log(header.bitsPerSample)
  const bytesPerSample = header.bitsPerSample / 8
  const samples = header.dataSize / header.channels / bytesPerSample // TODO: 16 for now
  const channels = Array.from({length: header.channels}, () => new Float32Array(samples))
  const view = new DataView(nub, header.offset + wavHeaderSize + bufferAfterHeader)
  console.log(header.offset + wavHeaderSize + bufferAfterHeader)
  console.log(view.byteLength, header.dataSize)

  for (let sample = 0; sample < samples; sample++) {
    for (let channelIndex = 0; channelIndex < header.channels; channelIndex++) {
      // const offset = (sample + channelIndex) * (header.bitsPerSample / 8)
      const offset = (sample * header.channels + channelIndex) * bytesPerSample
      /*if (!channels[channelIndex][sample]) {
        console.log(channels[channelIndex], channels[channelIndex][sample])
        console.warn(
          `Channel ${channelIndex} ${samples} ${sample} ${sample === samples} ${offset * 2} is undefined`,
        )
        sample = samples
        continue
      }*/
      channels[channelIndex][sample] = view.getInt16(offset, false) // TODO
    }
  }
  console.log(channels)

  for (const [channelIndex, channel] of channels.entries()) {
    buffer.copyToChannel(channel, channelIndex)
  }

  return {
    buffer: buffer,
    size: samples,
  }
}

/*function nubToAudioBuffer(nub: ArrayBuffer): AudioBuffer {
  const header = new DataView(nub, 0, 0xff)
  const fileSize = header.getUint32(0x14, true)

  return new AudioBuffer({
    sampleRate: 44_100, // TODO header.getUint16(0xf0, true),
  })
}*/
