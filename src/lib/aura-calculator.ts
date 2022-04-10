export interface Ranks {
  totalScore: number
  rankName: string
  totalMedals: number
  nextRank?: {
    nextRankDifference: number
    differences: [string, number][]
  }
}

export interface Input {
  grades: [number, string][]
  medalValues: Record<string, number>
  input: Record<string, number>
}

export function calculateRank({grades, medalValues, input}: Input): Ranks {
  const totalScore = Object.entries(input).reduce((a, [id, value]) => a + medalValues[id] * value, 0)

  const nextRankIndex = grades.findIndex(([rankThreshold]) => totalScore < rankThreshold)
  const [, rankName] = grades[Math.max(nextRankIndex - 1, 0)]
  const [nextRankThreshold] = grades[Math.min(Math.max(nextRankIndex, 0), grades.length - 1)]

  const nextRankDifference = nextRankThreshold - totalScore
  return {
    totalScore,
    rankName,
    totalMedals: Object.entries(input).reduce((a, [, b]) => a + b, 0),
    nextRank: rankName
      ? {
          nextRankDifference,
          differences: Object.entries(medalValues).map(([name, value]) => [
            name,
            Math.ceil(nextRankDifference / value),
          ]),
        }
      : undefined,
  }
}
