import React from "react"
import { render } from "react-dom"
import { Global, css } from "@emotion/react"
import normalize from "emotion-normalize"

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
      <h1>{hello}</h1>
    </>
  )
}

render(<App />, document.getElementById("root"))
