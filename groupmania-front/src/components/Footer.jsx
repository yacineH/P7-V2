import React from 'react'
import styled from 'styled-components'
import colors from '../utils/colors'

const FooterDiv = styled.footer`
  border: 1px solid ${colors.secondary};
  padding-top: 8px;
  margin: 0px;
  background-color: ${colors.secondary};
  text-align: center;
`

export default function Footer() {
  return (
    <FooterDiv>
      <p>Copyright © 2022-Tous droits résérvés</p>
    </FooterDiv>
  )
}
