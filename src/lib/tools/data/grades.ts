import {GRADES} from "./grades-data"

export const grades = [
  [0, "No Rank"] as [number, string],
  ...Object.entries(GRADES).flatMap(([name, steps], grade) =>
    steps.map<[number, string]>((step, index) => [
      step,
      `${index === 0 ? "VS " : ""}${grade + 1}${grade === 0 ? "st" : grade === 1 ? "nd" : "th"} Grade${
        index === 0 ? "" : index === 1 ? " Ace" : " Pro"
      } (${name} ${index + 1})`,
    ]),
  ),
]
