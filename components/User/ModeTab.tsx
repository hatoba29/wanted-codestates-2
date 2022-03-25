import React, { Dispatch, MouseEvent, SetStateAction, useEffect } from "react"
import styled from "@emotion/styled"
import { useSearchParams } from "react-router-dom"

interface IModeTab {
  setShowRetire: Dispatch<SetStateAction<boolean>>
  mostMode: string | undefined
}

const ModeTab = ({ setShowRetire, mostMode }: IModeTab) => {
  const [params, setParams] = useSearchParams()

  useEffect(() => {
    const mode = params.get("mode") || mostMode || ""
    const target = document.getElementById("tabs") as HTMLUListElement
    const children = [...target.children]
    children.forEach((c) => {
      if (c.id !== mode) {
        c.classList.remove("active")
      } else {
        c.classList.add("active")
      }
    })
  }, [params, mostMode])

  const handleTab = (e: MouseEvent<HTMLUListElement>) => {
    const curTarget = e.currentTarget
    const { target } = e

    if (target instanceof HTMLLIElement) {
      params.set("mode", target.id)
      setParams(params)

      const children = [...curTarget.children]
      children.forEach((c) => {
        if (c.id !== target.id) {
          c.classList.remove("active")
        } else {
          c.classList.add("active")
        }
      })
    }
  }

  const handleToggle = (e: MouseEvent<HTMLDivElement>) => {
    e.currentTarget.classList.toggle("active")
    setShowRetire((prev) => !prev)
  }

  return (
    <Wrapper>
      <Tabs id="tabs" onClick={handleTab}>
        <Tab id="combine">통합</Tab>
        <Tab id="fastest">매우빠름</Tab>
        <Tab id="infinit">무한부스터</Tab>
      </Tabs>
      <Retire>
        리타이어 노출
        <Toggle className="active" onClick={handleToggle}>
          <Switch />
        </Toggle>
      </Retire>
    </Wrapper>
  )
}

const Wrapper = styled.section`
  width: 100%;
  height: 36px;
  margin-top: 24px;
  border-bottom: 1px solid #ccc;

  display: flex;
  justify-content: space-between;
`

const Tabs = styled.ul`
  margin: 0;
  padding: 0;

  display: flex;
`

const Tab = styled.li`
  width: 80px;
  border-bottom: 0 solid #0077ff;

  color: #a1a1a1;
  font-size: 14px;
  text-align: center;

  list-style: none;
  cursor: pointer;
  transition: all 0.1s linear;

  :hover,
  &.active {
    color: #0077ff;
    border-bottom: 3px solid #0077ff;
  }
`

const Retire = styled.div`
  font-size: 12px;

  user-select: none;
  display: flex;
`

const Toggle = styled.div`
  width: 34px;
  height: 18px;
  margin-top: -1px;
  margin-left: 8px;
  border-radius: 9px;
  background-color: #f0f0f0;
  transition: background-color 0.2s ease-out;

  cursor: pointer;
  display: flex;

  &.active {
    background-color: #f62459;
  }

  > div {
  }
  &.active > div {
    margin-left: 18px;
  }
`

const Switch = styled.div`
  width: 14px;
  height: 14px;
  margin: auto 2px;
  border-radius: 50%;
  background-color: white;

  transition: margin 0.2s ease-out;
`

export default ModeTab
