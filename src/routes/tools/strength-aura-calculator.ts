import type {RequestHandler} from "@sveltejs/kit"
import * as fs from "node:fs"
import {parseCSV} from "$lib/csv"

const path = "static/page/tools/strength-aura-calculator"

export const get: RequestHandler = () => {
  return {
    status: 200,
    body: {
      grades: parseCSV(fs.readFileSync(`${path}/grades.csv`).toString()).map(([grade, gradeName]) => [
        Number(grade.replace(/_/g, "")),
        gradeName,
      ]),
      medals: parseCSV(fs.readFileSync(`${path}/medals.csv`).toString()).reduce(
        (accumulator, [medal, medalValue]) => {
          accumulator[medal] = Number(medalValue)
          return accumulator
        },
        {},
      ),
    },
  }
}
