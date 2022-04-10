export function processHeader(markdown: string): Record<string, string> | undefined {
  if (!markdown.startsWith("---")) return undefined

  return Object.fromEntries(
    markdown
      .split("---")[1]
      .split("\n")
      .filter(line => line.trim().length > 0)
      .map(line => /^(\w+): ?(.*)$/.exec(line))
      .map(([_, key, value]) => [key.trim(), value.trim()]),
  )
}
