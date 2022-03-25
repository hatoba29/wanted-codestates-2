import axios from "axios"
import dayjs from "dayjs"
import { useQuery } from "react-query"

import type {
  QueryFunction,
  QueryFunctionContext,
  UseQueryOptions,
} from "react-query"
import type { AllMatches, IQueryKey, Result } from "~/types/getAllMatches"
import type { MatchDetail } from "~/types/getMatchDetail"

const matchTypeHash = {
  indi: "7b9f0fd5377c38514dbb78ebe63ac6c3b81009d5a31dd569d1cff8f005aa881a",
  team: "effd66758144a29868663aa50e85d3d95c5bc0147d7fdb9802691c2087f3416e",
}

const nexonAxios = axios.create({
  baseURL: "/api",
  headers: {
    Authorization: process.env.API_KEY as string,
  },
})

export const getAllMatches = async (ctx: QueryFunctionContext<IQueryKey[]>) => {
  const { matchType } = ctx.queryKey[0]
  const start = dayjs().startOf("day")
  const end = dayjs().endOf("day")
  const result: Result = []

  // get recent 50 match ids
  const allMatchRes = await nexonAxios.get<AllMatches>("/matches/all", {
    params: {
      start_date: start,
      end_date: end,
      limit: 200,
      match_types: matchTypeHash[matchType],
    },
  })

  // convert to match detail
  const res = await Promise.all(
    allMatchRes.data.matches[0].matches.map((id) =>
      nexonAxios.get<MatchDetail>(`/matches/${id}`)
    )
  )

  res.forEach((r) => {
    if (r.data.players) {
      if (r.data.players.length < 8) return
      r.data.players.forEach((p) =>
        result.push({
          channelName: r.data.channelName,
          characterName: p.characterName,
          matchWin: Number(p.matchWin),
          matchRank: Number(p.matchRank),
        })
      )
    } else {
      r.data.teams.forEach((t) => {
        if (!t.players) return
        if (t.players.length < 4) return
        t.players.forEach((p) => {
          result.push({
            channelName: r.data.channelName,
            characterName: p.characterName,
            matchWin: Number(p.matchWin),
            matchRank: Number(p.matchRank),
          })
        })
      })
    }
  })

  return result
}

export const useAMQuery = (
  key: IQueryKey[],
  fetcher: QueryFunction<Result, IQueryKey[]>,
  opt?: Omit<
    UseQueryOptions<Result, unknown, Result, IQueryKey[]>,
    "queryKey" | "queryFn"
  >
) => useQuery<Result, unknown, Result, IQueryKey[]>(key, fetcher, opt)
