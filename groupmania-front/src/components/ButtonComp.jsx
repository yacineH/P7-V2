import React from 'react'
import styled from 'styled-components'
import { colors } from '../utils/config'

const StyledButton = styled.button`
  color: black;
  background-color: ${colors.primary};
  width: 150px;
  height: 45px;
  border-radius: 15px;
  border: 1px solid ${colors.secondary};
  font-size: 18px;
  font-weight: bold;
`

function ButtonComp({ type, children }) {
  return <StyledButton type={type}> {children} </StyledButton>
}

export default ButtonComp
