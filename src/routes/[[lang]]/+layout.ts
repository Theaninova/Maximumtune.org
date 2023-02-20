import type {LayoutLoad} from "./$types"
import {fallbackLocale, loadTranslations} from "../../lib/translations/translations"

export const prerender = true
export const trailingSlash = "always"

export const load: LayoutLoad = async ({url: {pathname}, params: {lang}}) => {
  const realPath = lang ? pathname.replace(/^\/[^/]+/, "") : pathname

  await loadTranslations(lang || fallbackLocale, realPath)

  return {pathname: realPath}
}
