import React, { useContext } from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { AiTwotoneDislike, AiTwotoneLike } from 'react-icons/ai'
import styled from 'styled-components'

import EmployeeContext from '../contexts/employeeContext'

import useFetch from '../hooks/useFetch'
import { URL_ALLPOSTS, getToken } from '../utils/config'

//#region style
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
//#endregion
export default function Like({ post }) {
  //#region declaration

  const [likes, setLikes] = useState(post.likes)
  const [dislikes, setDislikes] = useState(post.dislikes)
  const [usersLiked, setUsersLiked] = useState(post.usersLiked)
  const [usersDisliked, setUsersDisliked] = useState(post.usersDisliked)

  const { employeeId } = useContext(EmployeeContext)
  const [{ response, error }, doFetch] = useFetch(
    URL_ALLPOSTS + `/${post._id}/like`
  )

  //#endregion

  //#region events

  useEffect(() => {
    console.log('response', response)
    console.log('error', error)
  }, [response, error])

  const dataFetch = async (value) => {
    await doFetch({
      method: 'post',
      headers: {
        Authorization: 'Bearer ' + getToken(),
      },
      data: {
        employeeId: employeeId,
        like: value,
      },
    })
  }

  const handleClick = async (event, type) => {
    event.preventDefault()

    if (type === 'like') {
      if (
        !post.usersLiked.includes(employeeId) &&
        !post.usersDisliked.includes(employeeId)
      ) {
        await dataFetch(1)
        setUsersLiked((old) => [...old, employeeId])
        setLikes(post.likes + 1)
      } else if (post.usersLiked.includes(employeeId)) {
        await dataFetch(0)
        setUsersLiked(usersLiked.slice(usersLiked.indexOf(employeeId, 1)))
        setLikes(post.likes === 0 ? 0 : post.likes - 1)
      }
    } else {
      if (
        !post.usersLiked.includes(employeeId) &&
        !post.usersDisliked.includes(employeeId)
      ) {
        await dataFetch(-1)
        setUsersDisliked((old) => [...old, employeeId])
        setDislikes(post.dislikes + 1)
      } else if (post.usersDisliked.includes(employeeId)) {
        await dataFetch(0)
        setDislikes(usersDisliked.slice(usersDisliked.indexOf(employeeId, 1)))
        setDislikes(post.dislikes === 0 ? 0 : post.dislikes - 1)
      }
    }
  }
  //#endregion
  //#region render
  return (
    <StyledContainer>
      <StyledDiv>
        <span>{likes}</span>
        <StyledButton
          name="like"
          onClick={(event) => handleClick(event, 'like')}
        >
          <AiTwotoneLike />
        </StyledButton>
      </StyledDiv>
      <StyledDiv>
        <span>{dislikes}</span>
        <StyledButton
          name="dislike"
          onClick={(event) => handleClick(event, 'dislike')}
        >
          <AiTwotoneDislike />
        </StyledButton>
      </StyledDiv>
    </StyledContainer>
  )
  //#endregion
}
