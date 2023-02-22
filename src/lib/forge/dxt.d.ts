declare module "dxt-js" {
  const dxt: {
    flags: {
      ColourClusterFit: 8
      ColourIterativeClusterFit: 256
      ColourMetricPerceptual: 32
      ColourMetricUniform: 64
      ColourRangeFit: 16
      DXT1: 1
      DXT3: 2
      DXT5: 4
      WeightColourByAlpha: 128
    }
    compress(data: ArrayBufferLike | ImageData, width: number, height: number, flags: number)
    decompress(data: ArrayBufferLike | ImageData, width: number, height: number, flags: number)
  }

  export default dxt
}
