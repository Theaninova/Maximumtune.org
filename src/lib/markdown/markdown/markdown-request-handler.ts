import type {RequestHandler} from "@sveltejs/kit"
import * as fs from "node:fs"
import type {MarkdownResult} from "./process-markdown"
import {processMarkdown} from "./process-markdown"
import type {JSONObject} from "@sveltejs/kit/types/private"

export async function getMarkdownPost(path: string, post?: string): Promise<MarkdownResult> {
  return await processMarkdown({markdown: fs.readFileSync(`static/page/${path}${post ?? ""}.md`)})
}

export const markdownRequestHandler: (path: string) => RequestHandler<{post: string}> =
  (path = "") =>
  async ({params}) => {
    try {
      return {
        status: 200,
        body: (await getMarkdownPost(path, params.post)) as JSONObject,
      }
    } catch {
      return {
        status: 404,
      }
    }
  }
