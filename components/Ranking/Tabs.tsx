import React, { MouseEvent } from "react"
import styled from "@emotion/styled"
import { useSearchParams } from "react-router-dom"
import { FaUser, FaUsers } from "react-icons/fa"

const Tabs = () => {
  const [params, setParams] = useSearchParams()
  const matchType = params.get("matchType") || ""
  const mode = params.get("mode") || ""

  const matchTypeClasses = {
    indi: matchType === "indi" ? "active" : "",
    team: matchType === "team" ? "active" : "",
  }

  const modeClasses = {
    combine: mode === "combine" ? "active" : "",
    fastest: mode === "fastest" ? "active" : "",
    infinit: mode === "infinit" ? "active" : "",
  }

  const handleMatchType = (e: MouseEvent<HTMLButtonElement>) => {
    const target = e.currentTarget
    params.set("matchType", target.dataset.id as string)
    setParams(params)
  }

  const handleMode = (e: MouseEvent<HTMLDivElement>) => {
    const target = e.target as HTMLButtonElement
    params.set("mode", target.dataset.id as string)
    setParams(params)
  }

  return (
    <Wrapper>
      <MatchTypeTabs>
        <Tab
          data-id="indi"
          className={matchTypeClasses.indi}
          onClick={handleMatchType}
        >
          <FaUser />
          개인전
        </Tab>
        <Tab
          data-id="team"
          className={matchTypeClasses.team}
          onClick={handleMatchType}
        >
          <FaUsers size={18} />
          팀전
        </Tab>
      </MatchTypeTabs>
      <Seperator />
      <ModeTabs onClick={handleMode}>
        <Tab data-id="combine" className={modeClasses.combine}>
          통합
        </Tab>
        <Tab data-id="fastest" className={modeClasses.fastest}>
          매빠
        </Tab>
        <Tab data-id="infinit" className={modeClasses.infinit}>
          무부
        </Tab>
      </ModeTabs>
    </Wrapper>
  )
}

const Wrapper = styled.section`
  width: 100%;
  max-width: 1000px;
  margin-top: 16px;
  background-color: #005fcc;

  display: flex;
  align-items: center;

  font-size: 12px;

  .active {
    background-color: white;
    color: #0077cc;
  }

  svg {
    margin-right: 4px;
  }
`

const Seperator = styled.div`
  width: 1px;
  height: 14px;
  margin: 0 12px;
  background-color: white;
`

const MatchTypeTabs = styled.div`
  width: 200px;
  height: 26px;

  display: flex;

  button:first-of-type {
    border-radius: 6px 0 0 6px;
  }
  button:last-of-type {
    border-radius: 0 6px 6px 0;
  }
`

const ModeTabs = styled(MatchTypeTabs)`
  width: 110px;
`

const Tab = styled.button`
  border: 1px solid white;
  padding: 0;
  background-color: transparent;

  color: white;
  user-select: none;
  cursor: pointer;

  flex-grow: 1;
  display: flex;
  align-items: center;
  justify-content: center;

  :hover {
    background-color: white;
    color: #0077cc;
  }
`

export default Tabs
