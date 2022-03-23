import React from "react"
import styled from "@emotion/styled"
import { useNavigate } from "react-router-dom"

const NotFound = () => {
  const navigate = useNavigate()

  return (
    <BackDrop>
      <Modal>
        <Title>확인</Title>
        <Content>
          일치하는 유저가 없습니다.
          <br />
          닉네임이 변경되었는지 확인해주세요.
        </Content>
        <CloseBtn onClick={() => navigate(-1)}>확인</CloseBtn>
      </Modal>
    </BackDrop>
  )
}

const BackDrop = styled.div`
  position: fixed;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);

  display: grid;
  place-content: center;
`

const Modal = styled.section`
  width: 348px;
  height: 168px;
  border-bottom: 4px solid #0077ff;
  padding: 30px 24px 26px 24px;
  background-color: white;

  display: flex;
  flex-direction: column;
`

const Title = styled.h1`
  margin: 0;
  margin-bottom: 10px;

  font-size: 16px;
  font-weight: bold;
`

const Content = styled.p`
  margin: 0;
  font-size: 14px;
  line-height: 1.4;
`

const CloseBtn = styled.button`
  width: 50px;
  height: 32px;
  margin-top: auto;
  border: none;
  background-color: #0077ff;
  transition: background-color 0.2s ease-out;

  align-self: flex-end;
  cursor: pointer;

  color: white;
  font-size: 12px;

  :hover {
    background-color: #0155b1;
  }
`

export default NotFound
