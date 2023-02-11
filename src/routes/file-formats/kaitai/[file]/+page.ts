import type {PageLoad} from "./$types"

export const load = (({fetch, params}) =>
  fetch(`/kaitai/raw/${params.file}`).then(it => ({
    file: it.text(),
    fileName: params.file,
  }))) satisfies PageLoad
