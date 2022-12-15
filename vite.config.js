import {sveltekit} from "@sveltejs/kit/vite"
import {VitePWA} from "vite-plugin-pwa"
import {manifest} from "./manifest"

/** @type {import('vite').UserConfig} */
export default {
  plugins: [VitePWA({registerType: "autoUpdate", manifest}), sveltekit()],
}
