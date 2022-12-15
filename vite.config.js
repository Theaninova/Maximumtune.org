import {sveltekit} from "@sveltejs/kit/vite"
import {VitePWA} from "vite-plugin-pwa"
import {pwaConfig} from "./pwa-config.js"

/** @type {import('vite').UserConfig} */
export default {
  plugins: [VitePWA(pwaConfig), sveltekit()],
}
