import {sveltekit} from "@sveltejs/kit/vite"
import {pwaConfig} from "./pwa-config.js"
import {kaitai} from "vite-plugin-kaitai"
import {SvelteKitPWA} from "@vite-pwa/sveltekit"
import * as path from "path"

/** @type {import("vite").UserConfig} */
export default {
  plugins: [i18nShortcuts(), sveltekit(), kaitai(), SvelteKitPWA(pwaConfig)],
  ssr: {
    noExternal: ["three", "troika-three-text"],
  },
}

function i18nShortcuts() {
  let root
  /** @type {import('vite').Plugin} */
  return {
    name: "i18n-shortcuts",
    configResolved(config) {
      root = config.root
    },
    transform(src, id) {
      return {
        code: src.replace(/@(page|component)=>/g, it => {
          if (it === "@page=>") {
            return `/${path.posix.dirname(
              path.posix.relative(path.posix.join(root, "src", "routes", "[[lang]]"), id),
            )}/.`
          }
          return it
        }),
      }
    },
  }
}
