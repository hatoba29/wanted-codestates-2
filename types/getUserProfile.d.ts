import kart from "~/data/kart.json"
import track from "~/data/track.json"

export interface UserProfile {
  nickName: string
  matches: Match[]
}

interface Match {
  matchType: string
  matches: MatchInfo[]
}

interface MatchInfo {
  accountNo: string
  matchId: string
  matchType: string
  teamId: string
  character: string
  startTime: string
  endTime: string
  channelName: string
  trackId: keyof typeof track
  playerCount: number
  matchResult: string
  player: Player
}

interface Player {
  character: string
  kart: keyof typeof kart
  pet: string
  flyingPet: string
  rankinggrade2: "5" | "4" | "3" | "1" | "0"
  matchRank: string
  matchRetired: string
  matchWin: string
  matchTime: string
}

interface IQueryKey {
  nick: string
  matchType: "indi" | "team"
}

interface Result {
  notFound: boolean
  matchInfo: MatchInfo[]
}
