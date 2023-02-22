import type {Handle} from "@sveltejs/kit"
import {fallbackLocale} from "./lib/translations/translations"

export const handle = (async ({event, resolve}) => {
  const lang = event.params["lang"] || fallbackLocale

  return resolve(event, {
    transformPageChunk: ({html}) => html.replace(/<html.*>/, `<html lang="${lang}">`),
  })
}) satisfies Handle
