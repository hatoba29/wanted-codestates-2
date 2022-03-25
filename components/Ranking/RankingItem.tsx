import React from "react"
import styled from "@emotion/styled"
import type { IRanking } from "~/utils/calcRanking"
import { useNavigate } from "react-router-dom"

interface IRankingItem {
  rank: number
  data: IRanking["combine"][0]
}

const RankingItem = ({ rank, data }: IRankingItem) => {
  const navigate = useNavigate()

  if (rank === -1) {
    // render header
    return (
      <Header>
        <li>#</li>
        <li>닉네임</li>
        <li>누적포인트</li>
        <li>주행횟수</li>
      </Header>
    )
  }
  return (
    <Wrapper>
      <li>{rank}</li>
      <Name
        onClick={() => {
          navigate(`/user?nick=${data[0]}`)
        }}
      >
        {data[0]}
      </Name>
      <li>{data[1].point} PT</li>
      <li>{data[1].rounds}회</li>
    </Wrapper>
  )
}

const Wrapper = styled.ul`
  width: 1000px;
  height: 42px;
  margin: 0;
  margin-bottom: 10px;
  border: 1px solid #f2f2f2;
  padding: 0;
  padding-left: 60px;
  background-color: white;

  font-size: 14px;

  display: grid;
  grid-template-columns: 200px 420px 200px 120px;
  align-items: center;
  justify-content: center;

  li {
    list-style: none;
  }

  :hover {
    border: 1px solid #0077ff;
    color: #0077ff;
  }
`

const Header = styled(Wrapper)`
  border: none;
  background-color: transparent;
  color: white;
  font-size: 12px;

  :hover {
    border: none;
    color: white;
  }
`

const Name = styled.li`
  cursor: pointer;
`

export default RankingItem
