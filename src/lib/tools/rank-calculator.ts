import {ranks} from "./data/ranks"
import type {Rank} from "./data/ranks"
import type {InitialIncrement, RankConfig} from "./data/story-rank"
import {storyRank} from "./data/story-rank"

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

export function calculateStoryRank(input: RankInput): Rank {
  const battleStarScore = calculateInitialIncrement(input.battleStars, storyRank.battleStars)
  const ghostBattleScore = calculateInitialIncrement(input.ghostBattle, storyRank.ghostBattle)
  const storyEpisodesScore = calculateInitialIncrement(input.storyLoops, storyRank.storyLoops)

  return ranks[Math.min(battleStarScore + ghostBattleScore + storyEpisodesScore, ranks.length - 1)]
}
