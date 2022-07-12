import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

import CardPost from '../components/CardPost'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { BsFillFilePostFill } from 'react-icons/bs'
import styled from 'styled-components'
import PaginComp from '../components/PaginComp'
import colors from '../utils/colors'

import useFetch from '../hooks/useFetch'
import { getToken, URL_ALLPOSTS } from '../utils/config'

const DivNewPost = styled.div`
  display: flex;
  justify-content: end;
  margin-bottom: 20px;
`
const DivLink = styled.div`
  margin: 15px;
  color: ${colors.tertiare};
`
const StyledLink = styled(Link)`
  color: ${colors.tertiare};
  font-size: 18px;
  text-decoration: none;
`
const DivContent = styled.div`
  margin-bottom: 100px;
`
const DivPost = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
`

export default function Posts() {
  const [posts, setPosts] = useState([])
  const [pageNumber, setPageNumber] = useState(1)
  const [totalPages, setTotalPages] = useState(10)
  const [{ response, error, isLoading }, doFetch] = useFetch(
    URL_ALLPOSTS + '/all/' + pageNumber
  )

  useEffect(() => {
    doFetch({
      method: 'get',
      headers: {
        Authorization: 'Bearer ' + getToken(),
      },
    })
  }, [doFetch, pageNumber])

  useEffect(() => {
    if (response) {
      setPosts(response.posts)
      setTotalPages(response.totalPage)
    }
    if (error) {
      console.log(error)
    }
  }, [response, error])

  return (
    <div>
      <Header />
      <DivNewPost>
        <DivLink>
          <StyledLink to="/newPost">
            New Post <BsFillFilePostFill />
          </StyledLink>
        </DivLink>
      </DivNewPost>
      <DivContent>
        <DivPost>
          {isLoading ? (
            <div className="spinner-border" role="status">
              <span className="sr-only">Loading...</span>
            </div>
          ) : (
            posts &&
            posts.map(
              (post) => (
                <Link
                  style={{
                    textDecoration: 'none',
                  }}
                  to={`/post/${post._id}`}
                  key={post._id}
                >
                  <CardPost post={post} />
                </Link>
              ),
              0
            )
          )}
        </DivPost>

        <PaginComp
          setPage={setPageNumber}
          pageNumber={pageNumber}
          totalPages={totalPages}
        />
      </DivContent>
      <Footer />
    </div>
  )
}
