import axios from "axios"
import { QueryFunction, QueryFunctionContext, useQuery } from "react-query"
import dayjs from "dayjs"
import type { UserProfile, IQueryKey, Result } from "~/types/getUserProfile"

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

export const useNexonQuery = (
  key: IQueryKey[],
  fetcher: QueryFunction<Result, IQueryKey[]>
) => useQuery<Result, unknown, Result, IQueryKey[]>(key, fetcher)
