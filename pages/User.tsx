import React, { useEffect, useState } from "react"
import styled from "@emotion/styled"
import { useSearchParams } from "react-router-dom"
import { useQuery } from "react-query"
import { FaInfoCircle } from "react-icons/fa"

import { getUserProfile } from "~/api/fetcher"
import UserComp from "~/components/User"
import calcRecords from "~/utils/calcRecords"
import calcRank from "~/utils/calcRank"

import type { IRecords } from "~/components/User/Records"
import type { IRank } from "~/components/User/Rank"
import type { Result, Player, IQueryKey } from "~/types/getUserProfile"

type TMatchType = "indi" | "team"

const User = () => {
  const params = useSearchParams()[0]
  const nick = params.get("nick") || ""
  const matchType = (params.get("matchType") as TMatchType) || "indi"
  const { data, isLoading } = useQuery<Result, unknown, Result, IQueryKey[]>(
    [{ nick, matchType }],
    getUserProfile
  )

  const [character, setCharacter] = useState("")
  const [license, setLicense] = useState<Player["rankinggrade2"]>("0")
  const [recordsData, setRecordsData] = useState<IRecords["data"] | null>(null)
  const [rankData, setRankData] = useState<IRank["data"] | null>(null)

  // initialize data after fetching
  useEffect(() => {
    if (!data || data.matchInfo.length === 0) return
    const info = data.matchInfo[0]
    setCharacter(info.character)
    setLicense(info.player.rankinggrade2)
    setRecordsData(calcRecords(data.matchInfo))
    setRankData(calcRank(data.matchInfo))
  }, [data])

  if (data?.notFound) return <UserComp.NotFound />
  return (
    <Wrapper>
      <Info>
        <FaInfoCircle />
        &nbsp; 카트라이더 매치데이터는 최근 1년치 데이터만 확인할 수 있습니다
      </Info>
      <UserComp.Profile
        character={character}
        license={license}
        matchType={matchType}
      />
      <Stat>
        <UserComp.Records data={recordsData} />
        <UserComp.Rank data={rankData} />
      </Stat>
      <UserComp.Spinner show={isLoading} />
    </Wrapper>
  )
}

const Wrapper = styled.section`
  background-color: #fafafa;
  padding: 0 100px;

  display: flex;
  flex-direction: column;
`

const Info = styled.section`
  margin-top: 30px;
  margin-bottom: 20px;
  font-size: 12px;

  display: flex;
  align-items: center;
`

const Stat = styled.section`
  width: 100%;
  height: 266px;
  margin-top: 20px;

  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 10px;
`

export default User
