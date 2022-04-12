import adapter from "@sveltejs/adapter-static"
import preprocess from "svelte-preprocess"
import {mdsvex} from "mdsvex"

/** @type {import("@sveltejs/kit").Config} */
const config = {
  // Consult https://github.com/sveltejs/svelte-preprocess
  // for more information about preprocessors
  preprocess: [
    mdsvex({
      extension: ".svx",
      layout: {
        post: "src/routes/post/_post.svelte",
        _: "src/lib/components/SvxLayout.svelte",
      },
    }),
    preprocess(),
  ],
  extensions: [".svelte", ".svx"],

  kit: {
    adapter: adapter(),
    inlineStyleThreshold: 16_384,
    trailingSlash: "always",
    prerender: {
      default: true,
    },
  },
}

export default config
