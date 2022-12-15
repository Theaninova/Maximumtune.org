import {sveltekit} from "@sveltejs/kit/vite"
import {VitePWA} from "vite-plugin-pwa"

/** @type {import('vite').UserConfig} */
export default {
  plugins: [sveltekit(), VitePWA()],
}
