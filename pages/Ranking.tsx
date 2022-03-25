import React, { useEffect, useState } from "react"
import styled from "@emotion/styled"
import { useSearchParams } from "react-router-dom"

import { getAllMatches, useAMQuery } from "~/api/getAllMatches"
import calcRanking, { IRanking } from "~/utils/calcRanking"

import Header from "~/components/Ranking/Header"
import Tabs from "~/components/Ranking/Tabs"
import Ranker from "~/components/Ranking/Ranker"
import RankingItem from "~/components/Ranking/RankingItem"
import Spinner from "~/components/User/Spinner"

type TMatchType = "indi" | "team"
type TMode = "combine" | "fastest" | "infinit"

const Ranking = () => {
  const params = useSearchParams()[0]
  const matchType = (params.get("matchType") as TMatchType) || "indi"
  const mode = (params.get("mode") as TMode) || "combine"
  const [rankingData, setRankingData] = useState<IRanking>()
  const headerData: IRanking["combine"][0] = [
    "닉네임",
    { point: -1, rounds: -1 },
  ]

  const { data } = useAMQuery([{ matchType }], getAllMatches)

  // calc ranking after data fetched
  useEffect(() => {
    if (!data) return
    setRankingData(calcRanking(data, matchType))
  }, [data, matchType])

  return (
    <Wrapper>
      <TopSection>
        <Header />
        <Tabs />
        <TopRankers>
          {rankingData?.[mode].slice(0, 3).map((d, i) => (
            <Ranker
              key={d[0]}
              characterName={d[0]}
              matchRank={i + 1}
              point={d[1].point}
              matchType={matchType}
            />
          ))}
        </TopRankers>
      </TopSection>
      <RankingList>
        <RankingItem rank={-1} data={headerData} />
        {rankingData?.[mode].slice(3).map((d, i) => (
          <RankingItem key={d[0]} rank={i + 4} data={d} />
        ))}
      </RankingList>
      <Spinner show={!data || !rankingData} />
    </Wrapper>
  )
}

const Wrapper = styled.section`
  background-color: #fafafa;
  display: flex;
  flex-direction: column;
  align-items: center;
`

const TopSection = styled.section`
  width: 100%;
  background-color: #005fcc;

  display: flex;
  flex-direction: column;
  align-items: center;
`

const TopRankers = styled.section`
  width: 1000px;
  margin: 64px 0;
  margin-bottom: 120px;

  display: flex;
  justify-content: space-evenly;
`

const RankingList = styled.section`
  margin-top: -64px;
`

export default Ranking
