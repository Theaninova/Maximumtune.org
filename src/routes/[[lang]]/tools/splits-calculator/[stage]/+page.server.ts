import type {PageServerLoad} from "./$types"
import {Stages} from "$lib/tools/splits-calculator"
import {error} from "@sveltejs/kit"

export const load = (({params}) => {
  const stage = Stages.find(({key}) => key === params.stage)
  if (!stage) return error(404)

  return stage
}) satisfies PageServerLoad
