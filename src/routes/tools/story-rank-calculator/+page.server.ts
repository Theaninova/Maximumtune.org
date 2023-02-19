import type {PageServerLoad} from "./$types"
import {rankNames} from "$lib/tools/data/story-rank"

export const load = (() => {
  return Object.fromEntries(rankNames.map(key => [key, 0]))
}) satisfies PageServerLoad
