import React, { ChangeEvent, KeyboardEvent, useState } from "react"
import {
  NavLink,
  NavLinkProps,
  useLocation,
  useNavigate,
} from "react-router-dom"
import styled from "@emotion/styled"
import { FaSearch } from "react-icons/fa"
import logoImg from "~/public/assets/tmi_logo_default.svg"

const NavBar = () => {
  const [query, setQuery] = useState("")
  const location = useLocation()
  const navigate = useNavigate()

  const handleClass: NavLinkProps["className"] = ({ isActive }) =>
    isActive ? "active" : ""

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setQuery(e.currentTarget.value)
  }

  const handleEnter = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      navigate(`user?nick=${query}&matchType=indi`)
      setQuery("")
      e.currentTarget.blur()
    }
  }

  return (
    <Wrapper>
      <NavLink to="/">
        <Logo src={logoImg} alt="Logo" />
      </NavLink>

      <MenuItems>
        <MenuItem>
          <NavLink to="rank" className={handleClass}>
            랭킹
          </NavLink>
        </MenuItem>
        <MenuItem>
          <NavLink to="track" className={handleClass}>
            트랙
          </NavLink>
        </MenuItem>
      </MenuItems>

      {location.pathname !== "/" && (
        <Search>
          <SearchInput
            placeholder="닉네임 검색"
            value={query}
            onChange={handleSearch}
            onKeyDown={handleEnter}
          />
          <NavLink to={`user?nick=${query}&matchType=indi`}>
            <FaSearch className="fa-search" size={14} color="white" />
          </NavLink>
        </Search>
      )}
    </Wrapper>
  )
}

const Wrapper = styled.nav`
  width: 100%;
  height: 56px;
  padding: 0 32px;
  background-color: #005fcc;

  display: flex;
  align-items: center;
`

const Logo = styled.img`
  margin-right: 16px;
`

const MenuItems = styled.ul`
  margin: 0;
  margin-left: 16px;
  padding: 0;
`

const MenuItem = styled.li`
  width: 110px;
  margin-bottom: 4px;

  text-align: center;
  user-select: none;

  display: inline-block;
  list-style: none;

  a {
    color: white;
    opacity: 0.5;
    transition: opacity 0.1s linear;

    &.active,
    :hover {
      opacity: 1;
    }
  }
`

const Search = styled.div`
  width: 220px;
  height: 35px;
  margin-left: auto;

  display: grid;
  align-items: center;

  * {
    grid-row: 1;
    grid-column: 1;
  }

  a {
    justify-self: end;
  }

  .fa-search {
    cursor: pointer;
    opacity: 0.5;
    transition: opacity 0.1s linear;

    :hover {
      opacity: 1;
    }
  }
`

const SearchInput = styled.input`
  width: 100%;
  height: 100%;
  border: none;
  border-bottom: 1px solid rgba(255, 255, 255, 0.5);
  padding-right: 16px;
  background-color: transparent;
  transition: border-color 0.2s linear;

  color: white;

  :hover,
  :focus {
    border-color: rgba(255, 255, 255, 1);
  }

  ::placeholder {
    font-size: 14px;
  }
  :focus::placeholder {
    color: transparent;
  }
`

export default NavBar
