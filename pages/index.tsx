import React from "react"
import { render } from "react-dom"
import { Global, css } from "@emotion/react"
import normalize from "emotion-normalize"
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useParams,
} from "react-router-dom"

import NavBar from "~/components/NavBar"

const globalStyle = css`
  ${normalize}
  * {
    font-family: "Noto Sans KR", sans-serif;
    box-sizing: border-box;
  }

  input:focus {
    outline: none;
  }

  input::placeholder {
    color: rgba(255, 255, 255, 0.5);
  }

  a {
    text-decoration: unset;
    color: inherit;
  }
`

const User = () => {
  const p = useParams()
  return <h1>user {p.id}</h1>
}

const App = () => (
  <>
    <Global styles={globalStyle} />
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route path="/" element={<h1>Home</h1>} />
        <Route path="user">
          <Route path=":id" element={<User />} />
        </Route>
        <Route path="rank" element={<h1>Ranking</h1>} />
        <Route path="track" element={<h1>Track</h1>} />
        <Route path="*" element={<Navigate replace to="/" />} />
      </Routes>
    </BrowserRouter>
  </>
)

render(<App />, document.getElementById("root"))
