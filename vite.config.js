import {sveltekit} from "@sveltejs/kit/vite"
import {pwaConfig} from "./pwa-config.js"
import {kaitai} from "vite-plugin-kaitai"
import {SvelteKitPWA} from "@vite-pwa/sveltekit"

/** @type {import("vite").UserConfig} */
export default {
  plugins: [sveltekit(), kaitai(), SvelteKitPWA(pwaConfig)],
  ssr: {
    noExternal: ["three", "troika-three-text"],
  },
}
