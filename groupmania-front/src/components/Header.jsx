import React from 'react'
import { Link } from 'react-router-dom'
import { AiOutlineLogout } from 'react-icons/ai'
import Logo from '../assets/dark-logo.png'
import styled from 'styled-components'
import colors from '../utils/colors'

const HeaderDiv = styled.header`
  margin-bottom: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 2px solid ${colors.primary};
`
const StylledImage = styled.img`
  height: 150px;
  width: 200px;
`
const StylledLink = styled(Link)`
  color: ${colors.tertiare};
  text-decoration: none;
  font-size: 20px;
  margin-right: 15px;
`

export default function Header() {
  const handleClick = () => {
    window.localStorage.clear()
  }

  return (
    <HeaderDiv>
      <div>
        <Link to="/home">
          <StylledImage src={Logo} alt="logo-groupomania" />
        </Link>
      </div>
      <div>
        <StylledLink to="/" onClick={handleClick}>
          Logout <AiOutlineLogout />
        </StylledLink>
      </div>
    </HeaderDiv>
  )
}
