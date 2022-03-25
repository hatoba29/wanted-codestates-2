import React, { useEffect, useState } from "react"
import styled from "@emotion/styled"
import { useNavigate } from "react-router-dom"
import { ChartOptions } from "chart.js"

import { getUserProfile, useUPQuery } from "~/api/getUserProfile"
import calcRecords from "~/utils/calcRecords"
import Graph from "~/components/User/Graph"
import type { IRecords, TData } from "~/components/User/Records"

interface IRanker {
  characterName: string
  matchRank: number
  point: number
  matchType: "indi" | "team"
}

const IMG_BASE = "https://tmi.nexon.com"
const MEDAL_IMG = [
  "/img/assets/icon_goldmedal.png",
  "/img/assets/icon_silvermedal.png",
  "/img/assets/icon_bronzemedal.png",
]
const options: ChartOptions<"doughnut"> = {
  cutout: "75%",
  maintainAspectRatio: false,
  events: [],
  elements: {
    arc: {
      borderWidth: 0,
    },
  },
}

const Ranker = ({ characterName, matchRank, point, matchType }: IRanker) => {
  const navigate = useNavigate()
  const [rankerData, setRankerData] = useState<IRecords["data"]>()
  const { data } = useUPQuery(
    [{ nick: characterName, matchType }],
    getUserProfile
  )

  useEffect(() => {
    if (!data) return
    setRankerData(calcRecords(data.matchInfo))
  }, [data])

  if (!rankerData) return <></>
  const winRate = Math.round((rankerData.win / rankerData.total) * 100)
  const winData: TData = {
    datasets: [
      {
        data: [winRate, 100 - winRate],
        backgroundColor: ["#0077ff", "#ebebeb"],
      },
    ],
    labels: ["승률"],
  }

  const completeRate = Math.round(
    (rankerData.complete / rankerData.total) * 100
  )
  const retireData: TData = {
    datasets: [
      {
        data: [100 - completeRate, completeRate],
        backgroundColor: ["#f62459", "#ebebeb"],
      },
    ],
    labels: ["리타이어율"],
  }

  return (
    <Wrapper>
      <Status>
        <Medal
          src={`${IMG_BASE}${MEDAL_IMG[matchRank - 1]}`}
          className={matchRank === 1 ? "gold" : ""}
        />
        <Name
          className="bold"
          onClick={() => navigate(`/user?nick=${characterName}`)}
        >
          {characterName}
        </Name>
        <Detail>
          순위 <span className="bold">{matchRank}위</span>
        </Detail>
        <Detail>
          누적포인트 <span className="bold">{point.toLocaleString()}PT</span>
        </Detail>
      </Status>
      <Graphs>
        <Graph data={winData} options={options} />
        <Graph data={retireData} options={options} />
      </Graphs>
    </Wrapper>
  )
}

const Wrapper = styled.article`
  position: relative;
  width: 240px;
  height: 250px;
  border-radius: 10px;
  background-color: white;

  .bold {
    font-weight: bold;
  }

  :hover {
    color: #0077ff;
  }
`

const Status = styled.div`
  position: relative;
  height: 130px;
  border-radius: 10px;
  padding-top: 36px;
  padding-left: 40px;
  padding-bottom: 20px;

  background-image: url("${IMG_BASE}/img/background_flag_rank.png");
  background-size: cover;
  background-position: 50%;
`

const Name = styled.h1`
  margin: 0;
  margin-bottom: 12px;

  color: #0077ff;
  font-size: 18px;
  cursor: pointer;
`

const Detail = styled.p`
  margin: 4px 0;

  font-size: 14px;
`

const Medal = styled.img`
  position: absolute;
  top: 8px;
  left: 8px;
  width: 26px;
  height: 34px;

  transform: translate(0, -50%);

  &.gold {
    width: 36px;
    height: 44px;
  }
`

const Graphs = styled.div`
  width: 100%;
  height: 120px;
  border-top: 1px solid #0077cc;
  padding: 0 10px;
  padding-top: 10px;

  display: grid;
  grid-template-columns: repeat(2, 70px);
  justify-content: space-around;
`

export default Ranker
