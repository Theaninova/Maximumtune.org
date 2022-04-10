import type {RequestHandler} from "@sveltejs/kit"
import * as fs from "node:fs"
import {parseCSV} from "$lib/csv"

export const get: RequestHandler = () => {
  return {
    status: 200,
    body: {
      grades: parseCSV(fs.readFileSync(`static/page/tools/aura-calculator/grades.csv`).toString()).map(
        ([grade, gradeName]) => [Number(grade.replace(/_/g, "")), gradeName],
      ),
      medals: parseCSV(fs.readFileSync(`static/page/tools/aura-calculator/medals.csv`).toString()).reduce(
        (accumulator, [medal, medalValue]) => {
          accumulator[medal] = Number(medalValue)
          return accumulator
        },
        {},
      ),
    },
  }
}
