import {medalValues} from "./data/medal-values"
import {GRADE_DATA} from "./data/grades-data"

export interface Ranks {
  totalScore: number
  totalMedals: number
  currentRank: {
    rank: number
    level: number
  }
  nextRank: {
    rank: number
    level: number
    nextRankDifference: number
    differences: [string, number][]
  }
}

export function calculateRank(input: Record<string, number>): Ranks {
  const totalScore = Object.entries(input).reduce((a, [id, value]) => a + medalValues[id] * value, 0)

  const nextRank = GRADE_DATA.findIndex(levels => levels.some(it => totalScore < it))
  const nextLevel = nextRank === -1 ? -1 : GRADE_DATA[nextRank].findIndex(it => totalScore < it)
  const level = nextLevel <= 0 ? GRADE_DATA[0].length - 1 : nextLevel - 1
  const rank = nextRank === -1 ? GRADE_DATA.length - 1 : nextLevel <= 0 ? nextRank - 1 : nextRank

  const nextRankThreshold = nextRank !== -1 ? GRADE_DATA[nextRank][nextLevel] : Number.POSITIVE_INFINITY

  const nextRankDifference = nextRankThreshold - totalScore
  return {
    totalScore,
    totalMedals: Object.entries(input).reduce((a, [, b]) => a + b, 0),
    currentRank: {
      rank,
      level,
    },
    nextRank: {
      rank: nextRank,
      level: nextLevel,
      nextRankDifference,
      differences: Object.entries(medalValues).map(([name, value]) => [
        name,
        Math.ceil(nextRankDifference / value),
      ]),
    },
  }
}
