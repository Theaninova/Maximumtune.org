import type {PageServerLoad} from "./$types"
import {medalValues} from "$lib/tools/data/medal-values"

export const load = (() => {
  return Object.fromEntries(Object.entries(medalValues).map(([key]) => [key, 0]))
}) satisfies PageServerLoad
