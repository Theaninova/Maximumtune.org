export const rankNumbers = Array.from({length: 9})
  .map((_, i) => i + 1)
  .reverse()

export const rankNames = ["C", "B", "A", "S", "SS", "SSS", "SSSS"]

export const ranks: Rank[] = [
  {name: "N"},
  ...rankNames.flatMap(name => rankNumbers.map(number => ({name, number}))),
  {name: "SSSSS"},
  {name: "SSSSSS"},
]

export interface Rank {
  name: string
  number?: number
}

export interface InitialIncrement {
  initial: number[]
  increment: number
}

export interface RankConfig {
  battleStars: InitialIncrement
  ghostBattle: InitialIncrement
  storyLoops: InitialIncrement
}

export type RankInput = {
  [key in keyof RankConfig]: number
}

export function calculateInitialIncrement(score: number, {initial, increment}: InitialIncrement): number {
  return Math.max(
    initial.findIndex((threshold, i) => score < threshold || i === initial.length - 1) +
      Math.max(Math.floor((score - initial[initial.length - 1]) / increment), 0),
    0,
  )
}

export function calculateStoryRank(input: RankInput, config: RankConfig): Rank {
  const battleStarScore = calculateInitialIncrement(input.battleStars, config.battleStars)
  const ghostBattleScore = calculateInitialIncrement(input.ghostBattle, config.ghostBattle)
  const storyEpisodesScore = calculateInitialIncrement(input.storyLoops, config.storyLoops)

  console.log(input)

  return ranks[battleStarScore + ghostBattleScore + storyEpisodesScore]
}
