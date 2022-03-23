import React, { useEffect, useState } from "react"
import styled from "@emotion/styled"

const Spinner = ({ show }: { show: boolean }) => {
  const onOff = show ? "on" : "off"
  const [close, setClose] = useState("")

  // set display:none after animation finished
  useEffect(() => {
    if (!show) {
      setTimeout(() => {
        setClose("close")
      }, 300)
    } else {
      setClose("")
    }
  }, [show])

  return (
    <BackDrop className={`${onOff} ${close}`}>
      <Circle />
      <Text>데이터를 집계 중입니다.</Text>
    </BackDrop>
  )
}

const BackDrop = styled.div`
  position: absolute;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: white;

  animation: fade-in 0.3s ease-out;
  transition: opacity 0.3s ease-out;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  &.on {
    opacity: 1;
  }
  &.off {
    opacity: 0;
  }
  &.close {
    display: none;
  }

  @keyframes fade-in {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }
`

const Circle = styled.div`
  width: 50px;
  height: 50px;
  border: 4px solid #0077ff;
  border-radius: 50%;
  border-top: 4px solid transparent;

  animation: spin 1s infinite linear;
  @keyframes spin {
    0% {
      transform: rotate(0);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`

const Text = styled.p`
  font-size: 12px;
  text-align: center;
`

export default Spinner
