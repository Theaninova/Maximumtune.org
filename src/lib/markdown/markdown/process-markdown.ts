import mdsvex from "mdsvex"

export interface ProcessMarkdownOptions {
  markdown: string | Buffer
  abbreviations?: [string, string][]
}

export interface MarkdownResult {
  html: string

  [key: string]: unknown
}

export async function processMarkdown(options: ProcessMarkdownOptions): Promise<MarkdownResult> {
  const result = await mdsvex.compile(options.markdown as never)

  return {
    html: result.code,
    ...(result.data.fm as object),
  }
}
