import type {PageServerLoad} from "./$types"
import * as path from "node:path"
import {error} from "@sveltejs/kit"

const kaitaiFiles = Object.fromEntries(
  Object.entries(import.meta.glob("$lib/forge/kaitai/*.ksy", {as: "raw"})).map(([filePath, importer]) => [
    path.basename(filePath),
    importer,
  ]),
)
const kaitaiUrls = Object.fromEntries(
  Object.entries(import.meta.glob("$lib/forge/kaitai/*.ksy", {as: "url"})).map(([filePath, importer]) => [
    path.basename(filePath),
    importer,
  ]),
)

export const load = (async ({params}) => {
  if (!kaitaiFiles[params.file]) throw error(404, {message: "Not found"})
  return {
    fileName: params.file,
    url: await kaitaiUrls[params.file](),
    file: await kaitaiFiles[params.file](),
  }
}) satisfies PageServerLoad
