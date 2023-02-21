import type {PageServerLoad} from "./$types"

export const load: PageServerLoad = () => {
  const posts = import.meta.glob("./post/**/*.svx", {eager: true})

  return {
    posts: Object.entries(posts)
      .map(([key, value]) => ({
        path: key.replace(/\/[^/]+\.svx$/, "/"),
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        ...(value as any).metadata,
      }))
      // @ts-expect-error date subtraction
      .sort((a, b) => new Date(b.date) - new Date(a.date)),
  }
}
