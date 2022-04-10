export function parseCSV(csv: string): string[][] {
  return csv
    .trim()
    .split("\n")
    .map(row => row.split(","))
    .map(row => row.map(cell => cell.trim()))
    .filter(row => row.length > 0 && row.every(cell => cell.length > 0))
}
