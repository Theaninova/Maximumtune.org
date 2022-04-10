import {postsIndex} from "$lib/markdown/markdown/posts-index"

export function get() {
  return {
    status: 200,
    body: {
      posts: postsIndex(),
    },
  }
}
