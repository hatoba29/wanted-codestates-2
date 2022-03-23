import React from "react"
import styled from "@emotion/styled"
import type { ChartData, ChartOptions, DefaultDataPoint } from "chart.js"

import Graph from "./Graph"

export interface IRecords {
  data: {
    total: number
    win: number
    complete: number
    mostMode: "combine" | "infinit" | "fastest"
  } | null
}

export type TData = ChartData<"doughnut", DefaultDataPoint<"doughnut">, string>

const MODES = {
  combine: "통합",
  infinit: "무한부스터",
  fastest: "매우빠름",
}

const Records = ({ data }: IRecords) => {
  if (!data) return <></>

  const winRate = Math.round((data.win / data.total) * 100)
  const winData: TData = {
    datasets: [
      {
        data: [winRate, 100 - winRate],
        backgroundColor: ["#0077ff", "#ebebeb"],
      },
    ],
    labels: ["승률"],
  }

  const completeRate = Math.round((data.complete / data.total) * 100)
  const completeData: TData = {
    datasets: [
      {
        data: [completeRate, 100 - completeRate],
        backgroundColor: ["#9bd728", "#ebebeb"],
      },
    ],
    labels: ["완주율"],
  }
  const retireData: TData = {
    datasets: [
      {
        data: [100 - completeRate, completeRate],
        backgroundColor: ["#f62459", "#ebebeb"],
      },
    ],
    labels: ["리타이어율"],
  }

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

  return (
    <Wrapper>
      <Title>
        <span className="blue">종합</span> 전적
        <span className="data">
          {data.total}전 {data.win}승 {data.total - data.win}패
        </span>
      </Title>
      <Graphs>
        <Graph data={winData} options={options} />
        <Graph data={completeData} options={options} />
        <Graph data={retireData} options={options} />
      </Graphs>
      <Footer>
        <span className="blue">최다주행</span> 모드
        <span className="mode">{MODES[data.mostMode]}</span>
      </Footer>
    </Wrapper>
  )
}

const Wrapper = styled.article`
  width: 100%;
  height: 100%;
  border: 1px solid #f2f2f2;
  padding: 0 20px;
  background-color: white;

  display: flex;
  flex-direction: column;

  .blue {
    color: #0077ff;
  }
`

const Title = styled.header`
  height: 40px;

  font-size: 14px;
  line-height: 40px;

  .data {
    float: right;
    font-size: 12px;
  }
`

const Graphs = styled.div`
  width: 100%;
  padding: 8px 0;
  border-top: 1px solid #f2f2f2;
  border-bottom: 1px solid #f2f2f2;
  flex-grow: 1;

  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  /* justify-items: center; */
`

const Footer = styled.header`
  height: 48px;
  font-size: 14px;
  line-height: 48px;

  .mode {
    float: right;
    font-size: 20px;
    font-weight: bold;
  }
`

export default Records
