import fs from "node:fs"
import type {RequestHandler} from "@sveltejs/kit"

export const get: RequestHandler = () => {
  return {
    status: 200,
    body: {
      rankConfig: JSON.parse(fs.readFileSync("static/page/tools/story-rank/story-rank.json", "utf8")),
    },
  }
}
