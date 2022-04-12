export interface InitialIncrement {
  initial: number[]
  increment: number
  name: string
}

export interface RankConfig {
  battleStars: InitialIncrement
  ghostBattle: InitialIncrement
  storyLoops: InitialIncrement
}

export const storyRank: RankConfig = {
  battleStars: {
    name: "Battle Stars",
    initial: [20, 50, 100, 400, 1000, 2000, 3000, 5000, 7000, 10_000],
    increment: 5000,
  },
  storyLoops: {
    name: "Story Episodes",
    initial: [
      10, 20, 30, 40, 50, 60, 80, 140, 200, 300, 400, 500, 600, 700, 900, 1100, 1500, 2000, 2500, 3000, 3500,
      4500, 5000, 8500, 17_400, 18_000,
    ],
    increment: 500,
  },
  ghostBattle: {
    name: "Ghost Battle Wins",
    initial: [30, 60, 105, 150, 210, 300, 420, 570, 750, 960, 1200, 1500, 2100, 3000, 4500],
    increment: 1500,
  },
}

export const rankNames = Object.keys(storyRank) as Array<keyof RankConfig>
