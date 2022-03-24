import React, { MouseEvent } from "react"
import styled from "@emotion/styled"
import { FaUser, FaUsers } from "react-icons/fa"
import { useSearchParams } from "react-router-dom"
import type { Player } from "~/types/getUserProfile"

interface IProfile {
  character: string
  license: Player["rankinggrade2"]
  matchType: "indi" | "team"
}

interface LicenseProp {
  url: string
}

const CHAR_BASE =
  "https://s3-ap-northeast-1.amazonaws.com/solution-userstats/metadata/character"

const LICENSE_IMG = {
  "5": "/assets/icon_l1.png",
  "4": "/assets/icon_l2.png",
  "3": "/assets/icon_l3.png",
  "1": "/assets/icon_beginner.png",
  "0": "",
}

const Profile = ({ character, license, matchType }: IProfile) => {
  const [params, setParams] = useSearchParams()
  const nick = params.get("nick")

  const handleTab = (e: MouseEvent<HTMLButtonElement>) => {
    if (e.currentTarget.classList.contains("indi")) {
      params.set("matchType", "indi")
    } else {
      params.set("matchType", "team")
    }
    setParams(params)
  }

  if (character === "") return <></>
  return (
    <Wrapper>
      <Pic src={`${CHAR_BASE}/${character}.png`} alt="profile pic" />
      <Nick>
        {nick}
        <License url={LICENSE_IMG[license]} />
      </Nick>
      <Tab>
        <TabItem
          onClick={handleTab}
          className={`indi ${matchType === "indi" ? "active" : ""}`}
        >
          <FaUser size={12} />
          개인전
        </TabItem>
        <TabItem
          onClick={handleTab}
          className={`team ${matchType === "team" ? "active" : ""}`}
        >
          <FaUsers size={16} />
          팀전
        </TabItem>
      </Tab>
    </Wrapper>
  )
}

const Wrapper = styled.section`
  width: 100%;
  height: 178px;
  border: 1px solid #f2f2f2;
  border-left: 4px solid #0077ff;
  background-color: white;

  display: grid;
  grid-template-columns: max-content;
  grid-template-areas:
    "pf nm"
    "pf tb";
`

const Pic = styled.img`
  width: 164px;
  margin-right: 20px;

  grid-area: pf;
  place-self: center;
`

const Nick = styled.h1`
  margin: 0;
  font-size: 46px;

  grid-area: nm;
  align-self: center;
`

const Tab = styled.div`
  width: 200px;
  height: 28px;
  grid-area: tb;

  display: flex;
  align-items: center;
  align-self: flex-start;
`

const TabItem = styled.button`
  width: 50%;
  height: 100%;
  border: 1px solid #0077ff;
  background-color: transparent;

  color: #0077ff;
  font-size: 12px;
  cursor: pointer;

  display: flex;
  align-items: center;
  justify-content: center;

  :hover,
  &.active {
    color: white;
    background-color: #0077ff;
  }

  svg {
    margin-right: 4px;
  }

  &.indi {
    border-radius: 6px 0 0 6px;
  }
  &.team {
    border-radius: 0 6px 6px 0;
  }
`

const License = styled.span<LicenseProp>`
  display: inline-block;
  width: 25px;
  height: 25px;
  margin-left: 12px;
  margin-bottom: 4px;
  background: url(${(props) => props.url}) no-repeat center/contain;
`

export default Profile
