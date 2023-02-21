import i18n from "sveltekit-i18n"
import type {Config} from "sveltekit-i18n"
import {derived} from "svelte/store"
import {page} from "$app/stores"

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
        routes: [new RegExp(route.replace(/\[[^\]]+]/g, "[^/]+"))],
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
    ...Object.entries(import.meta.glob("./common/**/*.json", {import: "default"})).map(([path, loader]) => {
      const locale = getLocaleFromPath(path)
      const key = path.match(/([^/]+)\.[^.]+\.json$/)[1]

      return {
        locale,
        key,
        loader,
      }
    }),
  ],
  fallbackLocale,
  parserOptions: {
    customModifiers: {
      translation: ({value, options}) => t.get(options.find(it => it.key === "key", {value: value}).value),
      ordinal: ({value, locale, options, defaultValue}) => {
        const pluralRules = new Intl.PluralRules(locale, {
          type: "ordinal",
        })
        const pluralRule = pluralRules.select(Number(value))
        console.log(pluralRule, Number(value))
        return options.find(it => it.key === pluralRule)?.value || defaultValue
      },
    },
  },
}

export const {t, locale, loading, loadTranslations} = new i18n(config)

export const pt = derived(
  [page, t],
  ([$page, $t]) =>
    (key: string, params = {}) =>
      $t(`${$page.route.id.replace(/^\/[^/]+/, "")}/.${key}`, {...$page.params, ...params}),
)
