import React from "react"
import styled from "@emotion/styled"
import {
  Chart,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
} from "chart.js"
import { Line } from "react-chartjs-2"

import type { ChartData, ChartOptions } from "chart.js"

Chart.register(LineElement, CategoryScale, LinearScale, PointElement)

export interface IRank {
  data: {
    recentAvg: number
    allAvg: number
    recentRanks: number[]
  } | null
}

const Rank = ({ data }: IRank) => {
  if (!data) return <></>

  const lineData: ChartData<"line"> = {
    datasets: [
      {
        data: data.recentRanks,
        borderColor: "#0077ff",
        borderWidth: 1,
        pointBackgroundColor: "#0077ff",
        pointRadius: 2,
        fill: false,
      },
    ],
    labels: data.recentRanks,
  }

  const options: ChartOptions<"line"> = {
    maintainAspectRatio: false,
    events: [],
    scales: {
      x: {
        display: false,
        reverse: true,
      },
      y: {
        reverse: true,
        min: 1,
        max: 8,
      },
    },
  }

  return (
    <Wrapper>
      <Title>
        <span className="blue">순위변동</span> 추이
        <span className="data">
          지난 200경기 <span className="blue">{data.allAvg}위</span> 최근 50경기
          <span className="blue"> {data.recentAvg}위</span>
        </span>
      </Title>
      <Graph>
        <Line data={lineData} options={options} />
      </Graph>
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
  border-bottom: 1px solid #ccc;

  font-size: 14px;
  line-height: 40px;

  .data {
    float: right;
    font-size: 12px;
    letter-spacing: -1px;
  }
`

const Graph = styled.div`
  margin: 10px 0;
  flex-grow: 1;
`

export default Rank
