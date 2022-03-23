import React from "react"
import styled from "@emotion/styled"
import { Chart, ArcElement } from "chart.js"
import { Doughnut } from "react-chartjs-2"

import type { ChartOptions } from "chart.js"
import type { TData } from "./Records"

Chart.register(ArcElement)

interface IGraph {
  data: TData
  options: ChartOptions<"doughnut">
}

const Graph = ({ data, options }: IGraph) => {
  const color = data.datasets[0].backgroundColor as string[]
  const percentage = data.datasets[0].data[0]

  return (
    <Wrapper>
      <Title>{data.labels?.[0]}</Title>
      <DoughnutWrapper>
        <Doughnut width={0} height={0} data={data} options={options} />
        <Percent color={color[0]}>{`${percentage}%`}</Percent>
      </DoughnutWrapper>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  width: 100%;

  display: flex;
  flex-direction: column;
  align-items: center;
`

const Title = styled.h1`
  margin: 0;
  font-size: 14px;
  font-weight: normal;
`

const DoughnutWrapper = styled.div`
  position: relative;
  width: 90%;
  flex-grow: 1;
`

const Percent = styled.p<{ color: string }>`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  margin: 0;
  margin-top: -2px;

  color: ${(props) => props.color};
  font-size: 20px;
`

export default Graph
