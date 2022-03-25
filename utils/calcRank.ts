import type { MatchInfo } from "~/types/getUserProfile"

const calcRank = (matches: MatchInfo[]) => {
  const recent = { sum: 0, total: 0 }
  const all = { sum: 0, total: 0 }
  const recentRanks: number[] = []

  matches.forEach((m, i) => {
    if (i < 50) {
      recent.total += 1
      if (m.player.matchRetired === "0" && m.player.matchRank !== "") {
        recent.sum += Number(m.player.matchRank)
        recentRanks.push(Number(m.player.matchRank))
      } else {
        recent.sum += 8
        recentRanks.push(8)
      }
    } else {
      all.total += 1
      if (m.player.matchRetired === "0" && m.player.matchRank !== "") {
        all.sum += Number(m.player.matchRank)
      } else {
        all.sum += 8
      }
    }
  })

  all.sum += recent.sum
  all.total += recent.total

  return {
    recentAvg: Math.round((recent.sum / recent.total) * 100) / 100,
    allAvg: Math.round((all.sum / all.total) * 100) / 100,
    recentRanks,
  }
}

export default calcRank
