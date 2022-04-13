export const rankNumbers = Array.from({length: 9})
  .map((_, i) => i + 1)
  .reverse()

export const rankNames = ["C", "B", "A", "S", "SS", "SSS", "SSSS"]

export const ranks: Rank[] = [
  {name: "N"},
  ...rankNames.flatMap(name => rankNumbers.map(number => ({name, number}))),
  ...rankNumbers.map(() => ({name: "SSSSS"})),
  {name: "SSSSSS"},
]

export interface Rank {
  name: string
  number?: number
}
