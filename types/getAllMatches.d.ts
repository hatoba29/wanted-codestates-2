export interface AllMatches {
  matches: Matches[]
}

interface Matches {
  matches: string[]
  matchType: string
}

interface IQueryKey {
  matchType: "indi" | "team"
}

type Result = MatchData[]

interface MatchData {
  channelName: string
  characterName: string
  matchWin: number
  matchRank: number
}
