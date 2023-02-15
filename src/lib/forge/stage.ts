import {inflate} from "pako"
import {Model} from "./three-nud"
import {luaConfigParser} from "./lua/lua-parser"
import type {ModelList} from "./lua/lua-parser"
import Nud from "./kaitai/nud.ksy"
import type {StageInfo} from "./analyzer"

export async function loadStage(stage: StageInfo) {
  const luaFile = await stage.fileSystem.getFile(`model/LOADLIST_${stage.name.replace(/\//g, "_")}.lua`)
  const loadList = luaConfigParser(await luaFile.text())
  console.log(loadList)

  const models = loadList.modellist.map<Promise<Model[]>>(model =>
    loadModelFromLoadList(model, stage).catch(error => {
      console.error(error)
      return []
    }),
  )

  return Promise.all(models).then(it => it.flat().filter(it => !!it))
}

async function loadModelFromLoadList(model: ModelList, stage: StageInfo) {
  const inflated = await loadAndInflate(model, stage)
  return loadInflatedModels(model, inflated)
}

async function loadAndInflate(model: ModelList, stage: StageInfo): Promise<Uint8Array> {
  const loadPath = model.bin.replace(/^sim:/, "").replace(/\/(?=[^/]*$)/, "/model/bin/")
  console.log(loadPath)
  const file = await stage.fileSystem.root!.getFile(loadPath)
  const buffer = await file.arrayBuffer()

  try {
    return (await inflate(buffer)) as Uint8Array
  } catch {
    return new Uint8Array(buffer)
  }
}

function loadInflatedModels(model: ModelList, inflated: Uint8Array) {
  return Object.entries(model).flatMap<Model>(([key, section]) => {
    if (!key.endsWith("Addr")) return

    const addresses = section as number[]
    const models: Model[] = []

    for (let i = 0; i < addresses.length; i += 2) {
      try {
        const model = new Model(new Nud(inflated.subarray(addresses[i], addresses[i] + addresses[i + 1])))
        models.push(model)
      } catch (error) {
        console.error(addresses[i], error)
      }
    }
    return models
  })
}
