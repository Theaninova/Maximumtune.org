import fs from "node:fs"
import {processHeader} from "./process-header"

const path = "static/page/posts"

export function postsIndex() {
  return (
    fs
      .readdirSync(path)
      .filter(file => file.endsWith(".md"))
      .map(file => [file.replace(/\.md$/, ""), fs.readFileSync(`${path}/${file}`).toString()])
      .map(([path, data]) => ({
        path: path,
        ...processHeader(data),
      }))
      // @ts-expect-error date subtraction
      .sort((a, b) => new Date(b.date) - new Date(a.date))
  )
}
