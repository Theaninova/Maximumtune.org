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
        index: "src/lib/components/layouts/Index.svelte",
        post: "src/lib/components/layouts/Post.svelte",
        _: "src/lib/components/layouts/Default.svelte",
      },
    }),
    preprocess(),
  ],
  extensions: [".svelte", ".svx"],

  kit: {
    adapter: adapter(),
    inlineStyleThreshold: 16_384,
  },
}

export default config
