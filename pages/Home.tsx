import React, { useState, ChangeEvent, KeyboardEvent } from "react"
import styled from "@emotion/styled"
import { FaSearch } from "react-icons/fa"
import { NavLink, useNavigate } from "react-router-dom"

type TCategory = "user" | "track"

const Home = () => {
  const placeholder = {
    user: "카트라이더 닉네임을 입력",
    track: "트랙 이름을 입력",
  }
  const param = {
    user: "nick",
    track: "trackName",
  }
  const [category, setCategory] = useState<TCategory>("user")
  const [query, setQuery] = useState("")
  const navigate = useNavigate()

  const handleCategory = (e: ChangeEvent<HTMLSelectElement>) => {
    setCategory(e.target.value as TCategory)
  }
  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setQuery(e.currentTarget.value)
  }

  const handleEnter = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      navigate(`${category}?${param[category]}=${query}`)
    }
  }

  return (
    <Wrapper>
      <Subtitle>넥슨 오픈API 기반</Subtitle>
      <Title>카트라이더 전적 검색</Title>
      <Search>
        <Category onChange={handleCategory}>
          <option value="user">유저</option>
          <option value="track">트랙</option>
        </Category>
        <SearchInput
          placeholder={placeholder[category]}
          onChange={handleSearch}
          onKeyDown={handleEnter}
        />
        <NavLink to={`${category}?${param[category]}=${query}`}>
          <FaSearch className="fa-search" size={24} color="white" />
        </NavLink>
      </Search>
    </Wrapper>
  )
}

const Wrapper = styled.section`
  height: 100vh;
  margin-top: -56px;
  background-image: url("assets/main_bg1.png");
  background-size: cover;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  @keyframes expand {
    0% {
      width: 0;
    }
    100% {
      width: 60%;
    }
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

const Subtitle = styled.h2`
  margin: 0;
  margin-bottom: 8px;
  color: white;
  font-weight: normal;
  opacity: 0;

  animation: fade-in 0.4s 0.2s ease-out forwards;
`

const Title = styled.h1`
  margin: 0;
  color: white;
  opacity: 0;

  animation: fade-in 0.4s 0.2s ease-out forwards;
`

const Search = styled.div`
  width: 0;
  height: 68px;
  margin-top: 24px;
  border: 4px solid white;
  border-radius: 34px;
  padding: 0 34px;

  display: flex;
  align-items: center;

  animation: expand 0.6s ease-out forwards;
  .fa-search {
    opacity: 0;
    animation: fade-in 0.3s 0.3s ease-out forwards;
  }
`

const Category = styled.select`
  width: 64px;
  height: 100%;
  border: none;
  background-color: transparent;
  opacity: 0;

  color: white;

  animation: fade-in 0.4s 0.2s ease-out forwards;

  :focus {
    outline: none;
  }

  option {
    color: black;
  }
`

const SearchInput = styled.input`
  height: 100%;
  border: none;
  padding: 0 16px;
  background-color: transparent;
  opacity: 0;

  color: white;
  font-size: 24px;
  line-height: 60px;

  flex-grow: 1;

  animation: fade-in 0.4s 0.2s ease-out forwards;
`

export default Home
