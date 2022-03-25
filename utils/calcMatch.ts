import kart from "~/data/kart.json"
import track from "~/data/track.json"
import type { IMatchList } from "~/components/User/MatchList"
import type { MatchInfo } from "~/types/getUserProfile"

const calcMatch = (matches: MatchInfo[], mode: string) => {
  const result: IMatchList["data"] = []
  matches.forEach((m) => {
    if (m.channelName.toLowerCase().endsWith(mode)) {
      result.push({
        matchId: m.matchId,
        teamId: Number(m.teamId),
        startTime: new Date(m.startTime),
        matchRank: Number(m.player.matchRank),
        playerCount: m.playerCount,
        track: track[m.trackId],
        kart: kart[m.player.kart],
        matchWin: Number(m.player.matchWin),
        matchRetired: Number(m.player.matchRetired),
        matchTime: Number(m.player.matchTime),
      })
    }
  })

  return result
}

export default calcMatch
