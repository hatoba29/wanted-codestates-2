import React from "react"
import { render } from "react-dom"
import { Global, css } from "@emotion/react"
import normalize from "emotion-normalize"
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"

const globalStyle = css`
  ${normalize}
  * {
    font-family: "Noto Sans KR", sans-serif;
    box-sizing: border-box;
  }
`

const App = () => {
  const hello = "Hello, world"

  return (
    <>
      <Global styles={globalStyle} />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<h1>{hello}</h1>} />
          <Route path="*" element={<Navigate replace to="/" />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

render(<App />, document.getElementById("root"))
