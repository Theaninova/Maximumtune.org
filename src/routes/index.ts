import {postsIndex} from "../lib/markdown/posts-index"
import {getMarkdownPost} from "../lib/markdown/markdown-request-handler"

export async function get() {
  return {
    status: 200,
    body: {
      posts: postsIndex(),
      content: (await getMarkdownPost("index")).html,
    },
  }
}
