import {GRADES} from "./grades-data"

function getSuffix(number_: number): string {
  switch (number_) {
    case 1:
      return "st"
    case 2:
      return "nd"
    case 3:
      return "rd"
    default:
      return "th"
  }
}

export const grades = [
  [0, "No Rank"] as [number, string],
  ...Object.entries(GRADES).flatMap(([name, steps], grade) =>
    steps.map<[number, string]>((step, index) => [
      step,
      `${index === 0 ? "VS " : ""}${grade + 1}${getSuffix(grade)} Grade${
        index === 0 ? "" : index === 1 ? " Ace" : " Pro"
      } (${name} ${index + 1})`,
    ]),
  ),
]
