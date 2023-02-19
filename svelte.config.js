import adapter from "@sveltejs/adapter-static"
import preprocess from "svelte-preprocess"
import seqPreprocessor from "svelte-sequential-preprocessor"
import {mdsvex} from "mdsvex"
import {preprocessThrelte} from "@threlte/preprocess"

/** @type {import("@sveltejs/kit").Config} */
const config = {
  // Consult https://github.com/sveltejs/svelte-preprocess
  // for more information about preprocessors
  preprocess: seqPreprocessor([
    preprocess(),
    mdsvex({
      extension: ".svx",
      layout: {
        post: "src/lib/components/layouts/Post.svelte",
        _: "src/lib/components/layouts/Default.svelte",
      },
    }),
    preprocessThrelte(),
  ]),
  extensions: [".svelte", ".svx"],

  kit: {
    adapter: adapter(),
    inlineStyleThreshold: 16_384,
  },
}

export default config
