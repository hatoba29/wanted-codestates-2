import React, { MouseEvent } from "react"
import styled from "@emotion/styled"
import dayjs from "dayjs"
import Duration from "dayjs/plugin/duration"
import { getMatchDetail, useMDQuery } from "~/api/getMatchDetail"
import { useSearchParams } from "react-router-dom"

dayjs.extend(Duration)

const KART_BASE =
  "https://s3-ap-northeast-1.amazonaws.com/solution-userstats/metadata/kart"

interface IMatchDetail {
  id: string
  teamId: number
}

const MatchDetail = ({ id, teamId }: IMatchDetail) => {
  const [params, setParams] = useSearchParams()
  // const navigate = useNavigate()
  const { data, isLoading } = useMDQuery([{ id }], getMatchDetail)

  const handleName = (e: MouseEvent<HTMLDivElement>) => {
    const target = e.currentTarget
    params.set("nick", target.textContent || "")
    setParams(params)
  }

  if (!data || isLoading) return <></>
  return (
    <Wrapper>
      <Detail>
        <Rank>#</Rank>
        <DummyKart>카트</DummyKart>
        <Name>유저</Name>
        <Record>기록</Record>
      </Detail>
      {data.map((d) => {
        let detailClass = ""
        let me = ""
        let rankText = d.matchRank.toString()
        let recordText = dayjs
          .duration(Math.round(d.matchTime / 10) * 10)
          .format("m'ss'SSS")
          .slice(0, -1)

        if (d.matchRetired === 1) {
          detailClass = "retire"
          rankText = "리타이어"
          recordText = "-"
        }
        if (d.matchRank === 0) {
          recordText = "-"
        }
        if (d.matchWin === 1) {
          detailClass += " win"
        }

        if (d.characterName === params.get("nick")) {
          me = "me"
        }
        // console.log(d.teamId, teamId)
        if (d.teamId && d.teamId === teamId) {
          me = "me"
        }

        return (
          <Detail key={d.characterName} className={`${detailClass} ${me}`}>
            <Rank className="rank">{rankText}</Rank>
            <Kart
              src={`${KART_BASE}/${d.kart}.png`}
              onError={(e) => {
                e.currentTarget.src =
                  "https://tmi.nexon.com/img/assets/empty_kart.png"
              }}
            />
            <Name onClick={handleName}>{d.characterName}</Name>
            <Record>{recordText}</Record>
          </Detail>
        )
      })}
      {Array(8 - data.length)
        .fill(0)
        .map((_, i) => (
          <Detail key={`${id}-${i}`} className="retire">
            <Rank className="rank">리타이어</Rank>
            <DummyKart />
            <Name></Name>
            <Record>-</Record>
          </Detail>
        ))}
    </Wrapper>
  )
}

const Wrapper = styled.ul`
  width: 100%;
  height: 176px;
  margin: 0;
  margin-top: -4px;
  margin-bottom: 4px;
  padding: 0;
  background-color: white;

  font-size: 12px;
  text-align: center;

  display: grid;
  grid-template-columns: repeat(9, 1fr);
`

const Detail = styled.li`
  width: 100%;
  height: 100%;

  list-style: none;

  * {
    display: grid;
    place-items: center;
  }

  &.me {
    background-color: #f2f3f4;
    .rank {
      background-color: #e6e8eb;
    }
  }
  &.win .rank {
    color: #0077ff;
  }
  &.win.me {
    color: #0077ff;
    .rank {
      background-color: #e5ecf5;
    }
  }
  &.retire .rank {
    color: #f62459;
  }
`

const Rank = styled.div`
  height: 40px;
  background-color: #f2f2f2;
`

const DummyKart = styled.div`
  height: 78px;
`

const Kart = styled.img`
  width: 100%;
  height: 78px;
  padding: 14px;
  object-fit: contain;
`

const Name = styled.div`
  height: 16px;
  cursor: pointer;
`

const Record = styled.div`
  height: 42px;
`

export default MatchDetail
