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
      .replace(/(?<=([\t ]*)\w+ = ){(\n[\t ]*["\d{](.|\s)*?)?(\n\1})/g, it => `[${it.slice(1, -1)}]`)
      .replace(/(?<=([\t ]*)\w+ = ){(\n[\t ]*["\d{](.|\s)*?)?(\n\1})/g, it => `[${it.slice(1, -1)}]`)
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
      .replace(/,(?=\s*[}\]])/gm, "")
      // add a comma for the top level object
      .replace(/^]/m, "],") +
    "}"

  return JSON.parse(jsonString)
}
