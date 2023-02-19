import type {PageServerLoad} from "./$types"
import {Stages} from "../../../lib/tools/splits-calculator"
import type {Stage} from "../../../lib/tools/splits-calculator"

export const load = (() => {
  const areas: Record<string, Stage[]> = {}
  for (const stage of Stages) {
    areas[stage.area] ||= []
    areas[stage.area].push(stage)
  }
  return {stages: Stages}
}) satisfies PageServerLoad
