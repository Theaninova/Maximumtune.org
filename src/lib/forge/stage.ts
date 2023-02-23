import {inflate} from "pako"
import {Model} from "./three-nud"
import type {ModelList} from "./lua/lua-parser"
import {Nud} from "./kaitai/compiled/nud"
import type {StageInfo} from "./analyzer"
import {createEnv, Table} from "lua-in-js"
import KaitaiStream from "kaitai-struct/KaitaiStream"
import {Nut} from "./kaitai/compiled/nut"

export async function loadStage(stage: StageInfo) {
  const luaFile = await stage.fileSystem.getFile(`model/LOADLIST_${stage.name.replace(/\//g, "_")}.lua`)

  const luaEnv = createEnv()
  const [textureList, modelList] = (
    luaEnv.parse(`${await luaFile.text()}\nreturn {TEXTURELIST, MODELLIST}`).exec() as Table
  ).toObject() as [string[], ModelList[]]

  const textures: Record<number, Nut.NutBody.Texture> = {}
  for (const texture of textureList) {
    const nut = await loadTextureFromLoadList(texture, stage)
    for (const nutTexture of nut.body.textures) {
      console.assert(
        !textures[nutTexture.gidx.hashId],
        "Duplicate texture identifier",
        nutTexture.gidx.hashId,
      )
      textures[nutTexture.gidx.hashId] = nutTexture
    }
  }

  const models: Model[] = []
  // TODO:
  for (const model of modelList.slice(0, 1)) {
    try {
      models.push(...(await loadModelFromLoadList(model, textures, stage)))
    } catch (error) {
      console.log(error)
    }
  }

  return models.filter(it => !!it)
}

async function loadModelFromLoadList(
  model: ModelList,
  textures: Record<number, Nut.NutBody.Texture>,
  stage: StageInfo,
) {
  const inflated = await loadAndInflate(model, stage)
  return loadInflatedModels(model, textures, inflated)
}

async function loadTextureFromLoadList(name: string, stage: StageInfo) {
  const inflated = await loadAndInflateTexture(name, stage)
  return new Nut(new KaitaiStream(inflated))
}

async function loadAndInflateTexture(name: string, stage: StageInfo): Promise<Uint8Array> {
  const loadPath = `model/nut/${name}`
  console.log(loadPath)
  const file = await stage.fileSystem.getFile(loadPath)
  const buffer = await file.arrayBuffer()

  try {
    return await inflate(buffer)
  } catch {
    return new Uint8Array(buffer)
  }
}

async function loadAndInflate(model: ModelList, stage: StageInfo): Promise<Uint8Array> {
  const loadPath = model.BIN.replace(/^sim:/, "").replace(/\/(?=[^/]*$)/, "/model/bin/")
  console.log(loadPath)
  const file = await stage.fileSystem.root!.getFile(loadPath)
  const buffer = await file.arrayBuffer()

  try {
    return await inflate(buffer)
  } catch {
    return new Uint8Array(buffer)
  }
}

function loadInflatedModels(
  model: ModelList,
  textures: Record<number, Nut.NutBody.Texture>,
  inflated: Uint8Array,
) {
  const errors: Record<string, unknown> = {}
  const models = Object.entries(model).flatMap<Model>(([key, section]) => {
    if (!key.endsWith("ADDR")) return

    const addresses = section as number[]
    const models: Model[] = []

    for (let i = 0; i < addresses.length; i += 2) {
      try {
        const stream = new KaitaiStream(new DataView(inflated.buffer, addresses[i], addresses[i + 1]))
        const model = new Model(new Nud(stream), undefined, textures)
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
