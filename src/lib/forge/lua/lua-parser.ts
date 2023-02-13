export type Addresses = "long" | "lodm" | "road" | "onrd" | "back" | "cast" | "refc" | "refr" | "rfbg"

export type ModelList = {
  sectionId: number
  bin: string
} & Record<`${Addresses}Addr`, number[]> &
  Record<`${Addresses}Name`, string[]>

export interface LoadList {
  texturelist: string[]
  modellist: ModelList[]
}

export function luaConfigParser(lua: string): LoadList {
  const jsonString =
    "{" +
    lua
      // remove comments
      .replace(/^\s*--.*$/gm, "")
      // replace array {} with []
      .replace(/(?<=(ADDR|NAME|TEXTURELIST)\s*=\s*[^}]*)},?/g, "],")
      .replace(/(?<=(ADDR|NAME|MODELLIST|TEXTURELIST)\s*=\s*)\{/g, "[")
      .replace(/}\s*$/, "]")
      // wrap prop names with "" and replace the = with :
      .replace(
        /(?<=^\s*)\w+\s*=/gm,
        it =>
          `"${it
            .replace(/\s*=$/, "")
            .toLowerCase()
            .replace(/_\w/g, it => it.slice(1).toUpperCase())}":`,
      )
      // remove trailing commas
      .replace(/,(?=\s*[}\]])/gm, "") +
    "}"

  return JSON.parse(jsonString)
}
