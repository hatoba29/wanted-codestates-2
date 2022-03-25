import React, { useEffect, useState } from "react"
import styled from "@emotion/styled"
import { useSearchParams } from "react-router-dom"
import { FaInfoCircle } from "react-icons/fa"

import { getUserProfile, useUPQuery } from "~/api/getUserProfile"
import UserComp from "~/components/User"
import calcRecords from "~/utils/calcRecords"
import calcRank from "~/utils/calcRank"
import calcMatch from "~/utils/calcMatch"

import type { IRecords } from "~/components/User/Records"
import type { IRank } from "~/components/User/Rank"
import type { IMatchList } from "~/components/User/MatchList"
import type { Player } from "~/types/getUserProfile"

type TMatchType = "indi" | "team"

const User = () => {
  const params = useSearchParams()[0]
  const nick = params.get("nick") || ""
  const matchType = (params.get("matchType") as TMatchType) || "indi"
  const mode = params.get("mode") || ""
  const { data, isLoading } = useUPQuery(
    [{ nick, matchType }],
    getUserProfile,
    {
      cacheTime: 0,
    }
  )

  const [character, setCharacter] = useState("")
  const [license, setLicense] = useState<Player["rankinggrade2"]>("0")
  const [showRetire, setShowRetire] = useState(true)
  const [recordsData, setRecordsData] = useState<IRecords["data"] | null>(null)
  const [rankData, setRankData] = useState<IRank["data"] | null>(null)
  const [matchData, setMatchData] = useState<IMatchList["data"] | null>(null)

  // initialize data after fetching
  useEffect(() => {
    if (!data || data.matchInfo.length === 0) return
    const info = data.matchInfo[0]
    setCharacter(info.character)
    setLicense(info.player.rankinggrade2)
    setRecordsData(calcRecords(data.matchInfo))
    setRankData(calcRank(data.matchInfo))
    setMatchData(calcMatch(data.matchInfo, mode))
  }, [data, mode])

  if (isLoading) window.scrollTo({ top: 0 })
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
        <UserComp.Comment data={character} />
      </Stat>
      <UserComp.ModeTab
        setShowRetire={setShowRetire}
        mostMode={recordsData?.mostMode}
      />
      <UserComp.MatchList data={matchData} showRetire={showRetire} />
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
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 10px;
`

export default User
