import YAML from "yaml"
import KaitaiStructCompiler from "kaitai-struct-compiler"

export function kaitai() {
  return {
    name: "kaitai-file",
    async transform(source, id) {
      if (!/\.ksy$/.test(id)) return
      return {
        code: await compileKaitaiToJs(source),
        map: null,
      }
    },
  }
}

async function compileKaitaiToJs(source) {
  const compiler = new KaitaiStructCompiler()
  const yaml = YAML.parse(source)
  const files = await compiler.compile(
    "javascript",
    yaml,
    {
      async importYaml(_name) {
        throw new Error("Import YAML not implemented!")
      },
    },
    false,
  )

  if (Object.keys(files).length !== 1) throw new Error(`Invalid output files: ${Object.keys(files)}`)

  // wrap the output in a proper module...
  return `
  import {KaitaiStream} from "kaitai-struct"

  export default function(source) {
    const self = {KaitaiStream};
    ${Object.values(files)[0]}

    const outputFunction = Object.entries(self).find(([name]) => name !== 'KaitaiStream')[1]
    return new outputFunction(new KaitaiStream(source))
  }
  `
}
