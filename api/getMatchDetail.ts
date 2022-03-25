import axios from "axios"
import { useQuery } from "react-query"
import type { QueryFunction, QueryFunctionContext } from "react-query"
import type { IQueryKey, MatchDetail, Result } from "~/types/getMatchDetail"

const nexonAxios = axios.create({
  baseURL: "/api",
  headers: {
    Authorization:
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhY2NvdW50X2lkIjoiMjUxOTM1OTM2IiwiYXV0aF9pZCI6IjIiLCJ0b2tlbl90eXBlIjoiQWNjZXNzVG9rZW4iLCJzZXJ2aWNlX2lkIjoiNDMwMDExMzkzIiwiWC1BcHAtUmF0ZS1MaW1pdCI6IjUwMDoxMCIsIm5iZiI6MTY0NzgzNTY5OSwiZXhwIjoxNjYzMzg3Njk5LCJpYXQiOjE2NDc4MzU2OTl9.F3P9zhvAjp4_J12_kuJ3y2GCo4-VWpWn-05wH5unc2I" as string,
  },
})

export const getMatchDetail = async (
  ctx: QueryFunctionContext<IQueryKey[]>
) => {
  try {
    const { id } = ctx.queryKey[0]
    let result: Result = []
    const res = await nexonAxios.get<MatchDetail>(`/matches/${id}`)

    if (res.data.players) {
      // individual match
      res.data.players.sort((a, b) => Number(a.matchRank) - Number(b.matchRank))
      result = res.data.players.map((p) => ({
        characterName: p.characterName,
        kart: p.kart,
        matchRank: Number(p.matchRank),
        matchRetired: Number(p.matchRetired),
        matchWin: Number(p.matchWin),
        matchTime: Number(p.matchTime),
      }))
    } else {
      // team match
      res.data.teams.forEach((t) => {
        t.players.forEach((p) => {
          result.push({
            characterName: p.characterName,
            kart: p.kart,
            matchRank: Number(p.matchRank),
            matchRetired: Number(p.matchRetired),
            matchWin: Number(p.matchWin),
            matchTime: Number(p.matchTime),
            teamId: Number(t.teamId),
          })
        })
      })
      result.sort((a, b) => Number(a.matchRank) - Number(b.matchRank))
    }

    return result
  } catch (err) {
    console.error(err)
    return []
  }
}

export const useMDQuery = (
  key: IQueryKey[],
  fetcher: QueryFunction<Result, IQueryKey[]>
) => useQuery<Result, unknown, Result, IQueryKey[]>(key, fetcher)
