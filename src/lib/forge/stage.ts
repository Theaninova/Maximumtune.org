import {inflate} from "pako"
import {Model} from "./three-nud"
import type {ModelList} from "./lua/lua-parser"
import Nud from "./kaitai/nud.ksy"
import type {StageInfo} from "./analyzer"
import {createEnv, Table} from "lua-in-js"

export async function loadStage(stage: StageInfo) {
  const luaFile = await stage.fileSystem.getFile(`model/LOADLIST_${stage.name.replace(/\//g, "_")}.lua`)

  const luaEnv = createEnv()
  const [, modelList] = (
    luaEnv.parse(`${await luaFile.text()}\nreturn {TEXTURELIST, MODELLIST}`).exec() as Table
  ).toObject() as [string[], ModelList[]]

  const models: Model[] = []
  for (const model of modelList) {
    try {
      models.push(...(await loadModelFromLoadList(model, stage)))
    } catch (error) {
      console.log(error)
    }
  }

  return models.filter(it => !!it)
}

async function loadModelFromLoadList(model: ModelList, stage: StageInfo) {
  const inflated = await loadAndInflate(model, stage)
  return loadInflatedModels(model, inflated)
}

async function loadAndInflate(model: ModelList, stage: StageInfo): Promise<Uint8Array> {
  const loadPath = model.BIN.replace(/^sim:/, "").replace(/\/(?=[^/]*$)/, "/model/bin/")
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
  const errors: Record<string, unknown> = {}
  const models = Object.entries(model).flatMap<Model>(([key, section]) => {
    if (!key.endsWith("ADDR")) return

    const addresses = section as number[]
    const models: Model[] = []

    for (let i = 0; i < addresses.length; i += 2) {
      try {
        const model = new Model(new Nud(inflated.subarray(addresses[i], addresses[i] + addresses[i + 1])))
        models.push(model)
      } catch (error) {
        errors[`0x${addresses[i].toString(16)} ~ 0x${(addresses[i] + addresses[i + 1]).toString(16)}`] = error
      }
    }

    return models
  })

  if (Object.keys(errors).length) {
    console.error(model.BIN)
    console.table(errors, ["name", "message"])
  }

  return models
}
