export function LuaToJson(lua: string): string {
  return lua.replace(/\w\s*=/g, ":").replace(/--[^\n]*\n/g, "")
}

export interface ConvertedLuaStageSection {
  TOTAL_SECT: number
  SECT_POLYGON: {
    SECT_ID: number
    GEO: number[][]
  }[][]
}
