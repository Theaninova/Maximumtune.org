import {GRADES} from "./grades-data"

export const grades = [
  [0, "No Rank"] as [number, string],
  ...Object.entries(GRADES).flatMap(([name, steps], grade) =>
    steps.map<[number, string]>((step, index) => [
      step,
      `${grade + 1}${grade === 0 ? "st" : "th"} Grade${
        index === 0 ? "" : index === 1 ? " Pro" : " Ace"
      } (${name} ${index + 1})`,
    ]),
  ),
]
