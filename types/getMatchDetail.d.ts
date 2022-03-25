export interface MatchDetail {
  channelName: string
  players: Player[]
  teams: [Team, Team]
}

interface Player {
  characterName: string
  kart: string
  matchRank: string
  matchWin: string
  matchRetired: string
  matchTime: string
}

interface Team {
  teamId: string
  players: [Player, Player, Player, Player]
}

interface IQueryKey {
  id: string
}

type Result = PlayerData[]

interface PlayerData {
  characterName: string
  kart: string
  matchRank: number
  matchWin: number
  matchRetired: number
  matchTime: number
  teamId?: number
}
