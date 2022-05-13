export interface Stage {
  name: string
  variation?: string
  imageIndex: number
  sections: number
}

export const Stages: Stage[] = [
  {
    name: "C1",
    variation: "Inward",
    imageIndex: 1,
    sections: 4,
  },
  {
    name: "C1",
    variation: "Outward",
    imageIndex: 2,
    sections: 4,
  },
  {
    name: "NBL",
    variation: "CCW",
    imageIndex: 3,
    sections: 4,
  },
  {
    name: "NBL",
    variation: "CW",
    imageIndex: 4,
    sections: 4,
  },
  {
    name: "Shibuya",
    imageIndex: 5,
    sections: 4,
  },
  {
    name: "Ikebukuro",
    imageIndex: 6,
    sections: 4,
  },
  {
    name: "Wangan",
    variation: "East",
    imageIndex: 7,
    sections: 4,
  },
  {
    name: "Wangan",
    variation: "West",
    imageIndex: 8,
    sections: 4,
  },
  {
    name: "Yokohane",
    variation: "Down",
    imageIndex: 9,
    sections: 4,
  },
  {
    name: "Yokohane",
    variation: "Up",
    imageIndex: 10,
    sections: 4,
  },
  {
    name: "Yaesu",
    variation: "Inward",
    imageIndex: 11,
    sections: 4,
  },
  {
    name: "Yaesu",
    variation: "Outward",
    imageIndex: 12,
    sections: 4,
  },
  {
    name: "Minato",
    variation: "Inbound",
    imageIndex: 13,
    sections: 4,
  },
  {
    name: "Minato",
    variation: "Outbound",
    imageIndex: 14,
    sections: 4,
  },
  {
    name: "Nagoya",
    imageIndex: 15,
    sections: 4,
  },
  {
    name: "Osaka",
    imageIndex: 16,
    sections: 4,
  },
  {
    name: "Kobe",
    imageIndex: 17,
    sections: 4,
  },
  {
    name: "Hiroshima",
    imageIndex: 25,
    sections: 4,
  },
  {
    name: "Fukuoka",
    imageIndex: 18,
    sections: 4,
  },
  {
    name: "Hakone",
    variation: "Inbound",
    imageIndex: 19,
    sections: 4,
  },
  {
    name: "Hakone",
    variation: "Outbound",
    imageIndex: 20,
    sections: 4,
  },
  {
    name: "Taikan",
    variation: "Up",
    imageIndex: 21,
    sections: 4,
  },
  {
    name: "Taikan",
    variation: "Down",
    imageIndex: 24,
    sections: 4,
  },
  {
    name: "Metro Hwy",
    variation: "Tokyo",
    imageIndex: 22,
    sections: 7,
  },
  {
    name: "Metro Hwy",
    variation: "Kanagawa",
    imageIndex: 23,
    sections: 7,
  },
]
