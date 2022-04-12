export function get() {
  const posts = import.meta.globEager("./post/*.svx")

  return {
    status: 200,
    body: {
      posts: Object.entries(posts).map(([key, value]) => ({
        path: key.replace(/\.svx$/, ""),
        ...value.metadata,
      })),
    },
  }
}
