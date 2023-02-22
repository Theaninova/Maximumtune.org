import type {LayoutLoad} from "./$types"
import {
  fallbackLocale,
  getLanguageIndependentPath,
  loadTranslations,
} from "../../lib/translations/translations"

export const prerender = true
export const trailingSlash = "always"

export const load: LayoutLoad = async ({url: {pathname}, params, route: {id}}) => {
  const realPath = params.lang ? pathname.replace(/^\/[^/]+/, "") : pathname

  await loadTranslations(params.lang || fallbackLocale, realPath)

  return {pathname: realPath, params, routeId: getLanguageIndependentPath(id)}
}
