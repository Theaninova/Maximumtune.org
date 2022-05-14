export interface Stage {
  name: string
  key: string
  variation?: string
  imageIndex: number
  sections: number
}

export type HistoryEntry<T> = {
  time: number
  value: T
}

export function latest<T>(array: HistoryEntry<T>[]): T {
  return array ? array[array.length - 1].value : undefined
}

export type TimeSplit = [number, number, number]

export interface StageSaveState {
  pb?: HistoryEntry<TimeSplit>[]
  sections?: HistoryEntry<TimeSplit>[][]
}

export function formatTimePart(part?: number, pad = 2): string {
  return part == undefined ? "".padStart(pad, "-") : part.toString().padStart(pad, "0")
}

export function formatTimeSplit(split?: TimeSplit) {
  const [minutes, seconds, milliseconds] = split || []

  return `${formatTimePart(minutes)}' ${formatTimePart(seconds)}" ${formatTimePart(milliseconds, 3)}`
}

export function combineTimeSplit(split?: TimeSplit): number {
  if (!split) {
    return undefined
  }

  const [minutes, seconds, milliseconds] = split
  return minutes * 60 * 1000 + seconds * 1000 + milliseconds
}

export function separateTimeSplit(time: number): TimeSplit {
  const t = Math.abs(time)
  const minutes = Math.floor(t / (60 * 1000))
  const seconds = Math.floor((t - minutes * 60 * 1000) / 1000)
  const milliseconds = t - minutes * 60 * 1000 - seconds * 1000
  return [minutes, seconds, milliseconds]
}

export function timeDifference(a: TimeSplit, b: TimeSplit): TimeSplit {
  if (!a || !b) {
    return undefined
  }

  console.log(
    combineTimeSplit(a) - combineTimeSplit(b),
    separateTimeSplit(combineTimeSplit(a) - combineTimeSplit(b)),
  )

  return separateTimeSplit(combineTimeSplit(a) - combineTimeSplit(b))
}

export function sumTimes(times: TimeSplit[]): TimeSplit {
  const complete = times?.filter(it => it && it[0] != undefined)
  if (!complete || complete.length === 0) {
    return undefined
  }

  return separateTimeSplit(
    complete.map(combineTimeSplit).reduce((accumulator, current) => accumulator + current),
  )
}

export const Stages: Stage[] = [
  {
    name: "C1",
    key: "c1_in",
    variation: "Inward",
    imageIndex: 1,
    sections: 4,
  },
  {
    name: "C1",
    key: "c1_out",
    variation: "Outward",
    imageIndex: 2,
    sections: 4,
  },
  {
    name: "NBL",
    key: "nbl_ccw",
    variation: "CCW",
    imageIndex: 3,
    sections: 4,
  },
  {
    name: "NBL",
    key: "nbl_cw",
    variation: "CW",
    imageIndex: 4,
    sections: 4,
  },
  {
    name: "Shibuya",
    key: "shibuya",
    imageIndex: 5,
    sections: 4,
  },
  {
    name: "Ikebukuro",
    key: "ikebukuro",
    imageIndex: 6,
    sections: 4,
  },
  {
    name: "Wangan",
    key: "wangan_east",
    variation: "East",
    imageIndex: 7,
    sections: 4,
  },
  {
    name: "Wangan",
    key: "wangan_west",
    variation: "West",
    imageIndex: 8,
    sections: 4,
  },
  {
    name: "Yokohane",
    key: "yokohane_down",
    variation: "Down",
    imageIndex: 9,
    sections: 4,
  },
  {
    name: "Yokohane",
    key: "yokohane_up",
    variation: "Up",
    imageIndex: 10,
    sections: 4,
  },
  {
    name: "Yaesu",
    key: "yaesu_in",
    variation: "Inward",
    imageIndex: 11,
    sections: 4,
  },
  {
    name: "Yaesu",
    key: "yaesu_out",
    variation: "Outward",
    imageIndex: 12,
    sections: 4,
  },
  {
    name: "Minato",
    key: "minato_in",
    variation: "Inbound",
    imageIndex: 13,
    sections: 4,
  },
  {
    name: "Minato",
    key: "minato__out",
    variation: "Outbound",
    imageIndex: 14,
    sections: 4,
  },
  {
    name: "Nagoya",
    key: "nagoya",
    imageIndex: 15,
    sections: 4,
  },
  {
    name: "Osaka",
    key: "osaka",
    imageIndex: 16,
    sections: 4,
  },
  {
    name: "Kobe",
    key: "kobe",
    imageIndex: 17,
    sections: 4,
  },
  {
    name: "Hiroshima",
    key: "hiroshima",
    imageIndex: 25,
    sections: 4,
  },
  {
    name: "Fukuoka",
    key: "fukuoka",
    imageIndex: 18,
    sections: 4,
  },
  {
    name: "Hakone",
    key: "hakone_out",
    variation: "Outbound",
    imageIndex: 19,
    sections: 4,
  },
  {
    name: "Hakone",
    key: "hakone_in",
    variation: "Inbound",
    imageIndex: 20,
    sections: 4,
  },
  {
    name: "Taikan",
    key: "taikan_up",
    variation: "Up",
    imageIndex: 21,
    sections: 4,
  },
  {
    name: "Taikan",
    key: "taikan_down",
    variation: "Down",
    imageIndex: 24,
    sections: 4,
  },
  {
    name: "Metro Hwy",
    key: "metro_hwy_tokyo",
    variation: "Tokyo",
    imageIndex: 22,
    sections: 7,
  },
  {
    name: "Metro Hwy",
    key: "metro_hwy_kanagawa",
    variation: "Kanagawa",
    imageIndex: 23,
    sections: 7,
  },
]
