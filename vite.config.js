import {sveltekit} from "@sveltejs/kit/vite"
import {VitePWA} from "vite-plugin-pwa"
import {pwaConfig} from "./pwa-config.js"
import {kaitai} from "./plugins/vite-plugin-kaitai.js"

/** @type {import("vite").UserConfig} */
export default {
  plugins: [VitePWA(pwaConfig), sveltekit(), kaitai()],
  ssr: {
    noExternal: ["three", "troika-three-text"],
  },
}
