import React from 'react'
import { AiTwotoneDislike, AiTwotoneLike } from 'react-icons/ai'
import styled from 'styled-components'

const StyledContainer = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
`
const StyledDiv = styled.div`
    margin: 10px;
`
const StyledButton = styled.button`
    margin: 3px;
    border: 0px;
`

export default function Like({ likes, dislikes, callBack }) {
    const handleLikeClick = (event) => {
        event.preventDefault()
        callBack('likes')
    }

    const handleDislikeClick = (event) => {
        event.preventDefault()
        callBack('dislikes')
    }

    return (
        <StyledContainer>
            <StyledDiv>
                <span>{likes}</span>
                <StyledButton name="likes" onClick={handleLikeClick}>
                    <AiTwotoneLike />
                </StyledButton>
            </StyledDiv>
            <StyledDiv>
                <span>{dislikes}</span>
                <StyledButton name="dislikes" onClick={handleDislikeClick}>
                    <AiTwotoneDislike />
                </StyledButton>
            </StyledDiv>
        </StyledContainer>
    )
}
