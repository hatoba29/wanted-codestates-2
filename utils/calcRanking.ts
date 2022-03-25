import type { Result } from "~/types/getAllMatches"

interface Characters {
  [characterName: string]: {
    point: number
    rounds: number
  }
}

interface PreResult {
  combine: Characters
  fastest: Characters
  infinit: Characters
}

export interface IRanking {
  combine: [string, Characters[string]][]
  fastest: [string, Characters[string]][]
  infinit: [string, Characters[string]][]
}

const INDI_SCORE = [-5, 10, 7, 5, 4, 3, 1, 0, -1]
const TEAM_SCORE = [0, 10, 8, 6, 5, 4, 3, 2, 1]

const calcRanking = (data: Result, matchType: "indi" | "team") => {
  const preResult: PreResult = {
    combine: {},
    fastest: {},
    infinit: {},
  }
  const result: IRanking = {
    combine: [],
    fastest: [],
    infinit: [],
  }

  data.forEach((d) => {
    // determine mode
    let mode: keyof IRanking | "" = ""
    if (d.channelName.endsWith("Combine")) {
      mode = "combine"
    } else if (d.channelName.endsWith("Fastest")) {
      mode = "fastest"
    } else if (d.channelName.endsWith("Infinit")) {
      mode = "infinit"
    } else {
      // continue when mode is not compatible
      return
    }

    // calc point
    let point = 0
    if (matchType === "indi") {
      point = INDI_SCORE.at(d.matchRank) || -5
    } else {
      point = TEAM_SCORE.at(d.matchRank) || 0
    }

    // update result
    if (preResult[mode][d.characterName]) {
      preResult[mode][d.characterName].point += point
      preResult[mode][d.characterName].rounds += 1
    } else {
      preResult[mode][d.characterName] = {
        point,
        rounds: 1,
      }
    }

    // sort preResult and save to result
    Object.keys(preResult).forEach((k) => {
      const key = k as keyof IRanking
      result[key] = Object.entries(preResult[key]).sort(
        (a, b) => b[1].point - a[1].point || b[1].rounds - a[1].rounds
      )
    })
  })

  return result
}

export default calcRanking
