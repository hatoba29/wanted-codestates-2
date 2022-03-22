import React from "react"
import { render } from "react-dom"
import { Global, css } from "@emotion/react"
import normalize from "emotion-normalize"
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useSearchParams,
} from "react-router-dom"
import { QueryClientProvider, QueryClient } from "react-query"

import NavBar from "~/components/NavBar"
import Home from "./Home"

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
  const [params, setParams] = useSearchParams()
  return <h1>User {params.get("nick")}</h1>
}

const Track = () => {
  const [params, setParams] = useSearchParams()
  return <h1>Track {params.get("trackName")}</h1>
}

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnMount: false,
      refetchOnWindowFocus: false,
      retry: false,
    },
  },
})

const App = () => (
  <>
    <Global styles={globalStyle} />
    <BrowserRouter>
      <NavBar />
      <QueryClientProvider client={queryClient}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="user" element={<User />} />
          <Route path="rank" element={<h1>Ranking</h1>} />
          <Route path="track" element={<Track />} />
          <Route path="*" element={<Navigate replace to="/" />} />
        </Routes>
      </QueryClientProvider>
    </BrowserRouter>
  </>
)

render(<App />, document.getElementById("root"))
