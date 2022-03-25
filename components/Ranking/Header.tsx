import React from "react"
import styled from "@emotion/styled"
import dayjs from "dayjs"

const FORMAT_STR = "YYYY년MM월DD일 HH:mm:ss"

const Header = () => {
  const today = dayjs()
  const start = today.startOf("month").format(FORMAT_STR)
  const end = today.endOf("month").format(FORMAT_STR)
  const recent = today.startOf("day").format(FORMAT_STR)

  return (
    <Wrapper>
      <Title>{today.month() + 1}월 TMI 랭킹</Title>
      <Seperator />
      <Detail>
        랭킹 산정기간 {start} ~ {end}
      </Detail>
      <Detail>최근 업데이트 {recent}</Detail>
    </Wrapper>
  )
}

const Wrapper = styled.section`
  width: 100%;
  max-width: 1000px;
  margin-top: 32px;

  color: white;
`

const Title = styled.h1`
  font-size: 22px;
  font-weight: bold;
`

const Seperator = styled.div`
  width: 36px;
  height: 4px;
  margin-bottom: 14px;
  background-color: white;
`

const Detail = styled.p`
  margin: 2px 0;
  font-size: 12px;
`

export default Header
