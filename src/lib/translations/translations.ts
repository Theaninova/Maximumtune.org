import i18n from "sveltekit-i18n"
import type {Config} from "sveltekit-i18n"

export const locales = ["en", "ja"]
export const fallbackLocale = "en"

function getLocaleFromPath(path: string) {
  return path.match(/([^.]+)\.json$/)[1]
}

const config: Config = {
  loaders: [
    ...Object.entries(import.meta.glob("./routes/**/*.json", {import: "default"})).map(([path, loader]) => {
      const locale = getLocaleFromPath(path)
      const route = path.replace(/^\.\/routes\//, "/").replace(/[^/]+$/, "")

      return {
        locale,
        key: route,
        routes: [route],
        loader,
      }
    }),
    ...Object.entries(import.meta.glob("./components/**/*.json", {import: "default"})).map(
      ([path, loader]) => {
        const locale = getLocaleFromPath(path)
        const route = path.replace(/^\.\/components\//, "@").replace(/\.[^.]+\.json$/, "")

        return {
          locale,
          key: route,
          loader,
        }
      },
    ),
  ],
  fallbackLocale,
}

console.log(JSON.stringify(config, null, 2))

export const {t, locale, loading, loadTranslations} = new i18n(config)
