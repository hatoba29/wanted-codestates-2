import axios from "axios"
import {
  QueryFunction,
  QueryFunctionContext,
  useQuery,
  UseQueryOptions,
} from "react-query"
import dayjs from "dayjs"
import type { UserProfile, IQueryKey, Result } from "~/types/getUserProfile"

const matchTypeHash = {
  indi: "7b9f0fd5377c38514dbb78ebe63ac6c3b81009d5a31dd569d1cff8f005aa881a",
  team: "effd66758144a29868663aa50e85d3d95c5bc0147d7fdb9802691c2087f3416e",
}

const nexonAxios = axios.create({
  baseURL: "/api",
  headers: {
    Authorization:
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhY2NvdW50X2lkIjoiMjUxOTM1OTM2IiwiYXV0aF9pZCI6IjIiLCJ0b2tlbl90eXBlIjoiQWNjZXNzVG9rZW4iLCJzZXJ2aWNlX2lkIjoiNDMwMDExMzkzIiwiWC1BcHAtUmF0ZS1MaW1pdCI6IjUwMDoxMCIsIm5iZiI6MTY0NzgzNTY5OSwiZXhwIjoxNjYzMzg3Njk5LCJpYXQiOjE2NDc4MzU2OTl9.F3P9zhvAjp4_J12_kuJ3y2GCo4-VWpWn-05wH5unc2I" as string,
  },
})

export const getUserProfile = async (
  ctx: QueryFunctionContext<IQueryKey[]>
) => {
  try {
    // convert nickname to access id
    const { nick, matchType } = ctx.queryKey[0]
    const nickRes = await nexonAxios.get(`/users/nickname/${nick}`)

    // fetch recent 1 year matches
    const endDate = dayjs().startOf("day")
    const startDate = endDate.subtract(1, "year")
    const { accessId } = nickRes.data
    const matchRes = await nexonAxios.get<UserProfile>(
      `/users/${accessId}/matches`,
      {
        params: {
          start_date: startDate,
          end_date: endDate,
          limit: 200,
          match_types: matchTypeHash[matchType],
        },
      }
    )

    return {
      notFound: false,
      matchInfo: matchRes.data.matches[0]?.matches || [],
    }
  } catch (err) {
    console.error(err)
    return {
      notFound: true,
      matchInfo: [],
    }
  }
}

export const useUPQuery = (
  key: IQueryKey[],
  fetcher: QueryFunction<Result, IQueryKey[]>,
  opt?: Omit<
    UseQueryOptions<Result, unknown, Result, IQueryKey[]>,
    "queryKey" | "queryFn"
  >
) => useQuery<Result, unknown, Result, IQueryKey[]>(key, fetcher, opt)
