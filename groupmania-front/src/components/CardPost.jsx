import React from 'react'
import NoImage from '../assets/no-image.jpg'
import styled from 'styled-components'
import colors from '../utils/colors'

const CardContainer = styled.div`
  margin: 20px;
  border: 1px solid ${colors.secondary};
  display: flex;
  border-radius: 20px;
`
const CardDivImage = styled.div`
  width: 250px;
  height: 200px;
  margin-right: 30px;
`
const StyledImage = styled.img`
  border-top-left-radius: 20px;
  border-bottom-left-radius: 20px;
  width: 250px;
  height: 200px;
`
const CardDivDescription = styled.div`
  padding-top: 25px;
  padding-right: 15px;
`
const StyledP = styled.p`
  color: ${colors.tertiare};
  font-size: 16px;
`
const StyledSpan = styled.span`
  color: black;
`

export default function CardPost({ post }) {
  const imgUrl = post.imageUrl ? post.imageUrl : NoImage

  return (
    <CardContainer>
      <CardDivImage>
        <StyledImage src={imgUrl} alt="post.message" />
      </CardDivImage>

      <CardDivDescription>
        <StyledP>
          <StyledSpan>Posté le : </StyledSpan>
          {new Date(post.datePost).toLocaleString()}
        </StyledP>
        <StyledP>{post.message.substring(0, 100)} ...</StyledP>
        <StyledP>likes : {post.likes}</StyledP>
        {/* <StyledP>dislikes : {post.dislikes}</StyledP> */}
      </CardDivDescription>
    </CardContainer>
  )
}
