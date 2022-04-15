export function camelCaseToTitleCase(string_: string): string {
  return string_.replace(/([a-z])([A-Z])/g, "$1 $2").replace(/^[a-z]/, match => match.toUpperCase())
}
