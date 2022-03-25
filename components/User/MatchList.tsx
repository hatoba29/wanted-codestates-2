import React, {
  Fragment,
  MouseEvent,
  ReactPortal,
  useMemo,
  useState,
} from "react"
import { createPortal } from "react-dom"
import styled from "@emotion/styled"
import { FaCaretDown, FaExclamationTriangle } from "react-icons/fa"
import dayjs from "dayjs"
import Duration from "dayjs/plugin/duration"
import RelativeTime from "dayjs/plugin/relativeTime"
import "dayjs/locale/ko"
import MatchDetail from "./MatchDetail"

dayjs.extend(Duration)
dayjs.extend(RelativeTime)
dayjs.locale("ko")

export interface IMatchList {
  data:
    | {
        matchId: string // 매치 상세정보 조회용
        teamId: number
        startTime: Date
        matchRank: number
        playerCount: number
        track: string // trackId에서 변환
        kart: string // 해시를 실제 이름으로 변환
        matchWin: number
        matchRetired: number
        matchTime: number // ms를 분초로 변환, 소숫점 둘째자리까지
      }[]
    | null
  showRetire: boolean
}

interface IToOpen {
  id: string
  portal: ReactPortal
}

const MatchList = ({ data, showRetire }: IMatchList) => {
  const [toOpen, setToOpen] = useState<IToOpen[]>([])

  const handleDetail = (e: MouseEvent<HTMLDivElement>) => {
    const target = e.currentTarget
    const isOpen = target.classList.contains("open")
    const id = target.dataset.id as string
    const teamId = Number(target.dataset.teamId)

    if (isOpen) {
      target.classList.remove("open")
      setToOpen((prev) => prev.filter((v) => v.id !== id))
    } else {
      target.classList.add("open")
      const portal = document.getElementById(id) as HTMLElement
      const el = {
        id,
        portal: createPortal(<MatchDetail id={id} teamId={teamId} />, portal),
      }
      setToOpen((prev) => [...prev, el])
    }
  }

  const matches = useMemo(() => {
    const result: JSX.Element[] = []
    data?.forEach((d) => {
      if (!showRetire && (d.matchRank === 0 || d.matchRank === 99)) return

      const time = dayjs
        .duration(Math.round(d.matchTime / 10) * 10)
        .format("m'ss'SSS")
        .slice(0, -1)
      let timeText = time
      let matchClass = ""
      let rankTextLeft = `#${d.matchRank}`
      let rankTextRight = `/${d.playerCount}`

      if (d.matchRetired === 1 || d.matchRank === 0) {
        matchClass = "retire"
        rankTextLeft = "#리타이어"
        rankTextRight = ""
        timeText = "-"
      } else if (d.matchWin === 1) {
        matchClass = "win"
      }

      result.push(
        <Fragment key={d.matchId}>
          <Match className={matchClass}>
            <Time>{dayjs(d.startTime).fromNow()}</Time>
            <Rank className="rank">
              <span>{rankTextLeft}</span>
              {rankTextRight}
            </Rank>
            <div>{d.track}</div>
            <Kart>{d.kart}</Kart>
            <Record>{timeText}</Record>
            <Arrow
              data-id={d.matchId}
              data-team-id={d.teamId}
              onClick={handleDetail}
            >
              <FaCaretDown color="#a1a1a1" />
            </Arrow>
          </Match>
          <div id={d.matchId} />
        </Fragment>
      )
    })

    return result
  }, [data, showRetire])

  return (
    <Wrapper>
      {matches}
      {toOpen.map((v) => v.portal)}
      {data?.length === 0 && (
        <Nothing>
          <FaExclamationTriangle />
          전적 정보가 존재하지 않습니다.
        </Nothing>
      )}
    </Wrapper>
  )
}

const Wrapper = styled.section`
  width: 100%;
  margin-top: 32px;
`

const Nothing = styled.div`
  width: 100%;
  height: 360px;

  color: #a1a1a1;
  font-size: 16px;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  svg {
    margin-bottom: 8px;
    font-size: 48px;
  }
`

const Match = styled.article`
  height: 88px;
  margin-bottom: 4px;
  border: 1px solid #f2f2f2;
  border-left: 4px solid #a1a1a1;

  font-size: 16px;

  display: grid;
  grid-template-columns: 65px 3fr 3fr 3fr 2fr 40px;
  place-items: center;

  &.win {
    border-left: 4px solid #0077ff;
    background-color: #0077ff0d;
    .rank {
      color: #0077ff;
    }
  }
  &.retire {
    border-left: 4px solid #f62459;
    background-color: #f624590d;
    .rank {
      color: #f62459;
    }
  }
`

const Time = styled.div`
  font-size: 12px;
`

const Rank = styled.div`
  color: #1f334a80;
  font-style: italic;

  span {
    margin-right: 4px;
    font-size: 30px;
    font-weight: bold;
  }
`

const Kart = styled.div`
  position: relative;
  width: 100%;
  height: 100%;

  display: grid;
  place-items: center;

  ::before,
  ::after {
    content: "";
    position: absolute;
    top: 50%;
    width: 1px;
    height: 16px;
    transform: translate(0, -50%);
    display: inline-block;
    background-color: #ebebeb;
  }
  ::before {
    left: 0;
  }
  ::after {
    right: 0;
  }
`

const Record = styled.div`
  font-weight: bold;
`

const Arrow = styled.div`
  width: 100%;
  height: 100%;
  border-left: 1px solid #ebebeb;

  display: grid;
  place-items: center;
  cursor: pointer;
`

export default MatchList
