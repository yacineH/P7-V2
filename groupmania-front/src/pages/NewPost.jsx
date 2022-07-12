import React, { useContext, useState } from 'react'
import { useHistory } from 'react-router-dom'
import Header from '../components/Header'
import EmployeeContext from '../contexts/employeeContext'
import Footer from '../components/Footer'
import { persistPost } from '../services/postAPI'
import NonImage from '../assets/no-image.jpg'
import styled from 'styled-components'
import colors from '../utils/colors'
import ButtonComp from '../components/ButtonComp'

const StyledForm = styled.form`
  margin-bottom: 200px;
  margin-top: 80px;
`

const DivTitle = styled.div`
  border: 1px solid ${colors.secondary};
  border-top-right-radius: 20px;
  border-top-left-radius: 20px;
  background-color: ${colors.secondary};
`

const Styledh2 = styled.h2`
  text-align: center;
  margin: 0px;
  color: ${colors.tertiare};
`

const DivId = styled.div`
  border-left: 1px solid ${colors.secondary};
  border-right: 1px solid ${colors.secondary};
  padding-top: 50px;
`

const DivTitre = styled.div`
  border-left: 1px solid ${colors.secondary};
  border-right: 1px solid ${colors.secondary};
`

const StyledDiv = styled.div`
  border-left: 1px solid ${colors.secondary};
  border-right: 1px solid ${colors.secondary};
`

const DivButton = styled.div`
  border-left: 1px solid ${colors.secondary};
  border-right: 1px solid ${colors.secondary};
  border-bottom-left-radius: 20px;
  border-bottom-right-radius: 20px;
  border-bottom: 1px solid ${colors.secondary};
`

const StyledDivButton = styled.div`
  padding-top: 50px;
  padding-bottom: 50px;
`

function NewPost() {
  const history = useHistory()
  const { employeeId } = useContext(EmployeeContext)

  const [currentPost, setCurrentPost] = useState({
    employeeId: employeeId,
    title: '',
    message: '',
    image: null,
  })

  const [imageLocale, setImageLocale] = useState(NonImage)

  const handleChange = (event) => {
    const { name, value } = event.target
    if (name === 'image') {
      var fReader = new FileReader()
      fReader.readAsDataURL(event.target.files[0])
      fReader.onload = function (e) {
        setImageLocale(e.target.result)
      }

      setCurrentPost({
        ...currentPost,
        [name]: event.target.files[0],
      })
    } else {
      setCurrentPost({ ...currentPost, [name]: value })
    }
  }

  const handleSubmit = async (event) => {
    event.preventDefault()

    try {
      await persistPost(currentPost)
      history.replace('home')
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div>
      <Header />
      <StyledForm className="container" onSubmit={handleSubmit}>
        <DivTitle className="row">
          <div className="col-12">
            <Styledh2>New Post</Styledh2>
          </div>
        </DivTitle>
        <DivId className="row">
          <label htmlFor="employeeId" className="col-4 col-form-label">
            Id
          </label>
          <input
            className="form-control col-7"
            type="text"
            id="employeeId"
            name="employeeId"
            value={employeeId}
            onChange={handleChange}
            readOnly
          />
        </DivId>
        <DivTitre className="row">
          <label htmlFor="title" className="col-4 col-form-label mt-4">
            Titre
          </label>
          <input
            type="text"
            className="form-control col-7 mt-4"
            id="title"
            name="title"
            aria-describedby="titleHelp"
            onChange={handleChange}
            required
          />
        </DivTitre>
        <StyledDiv className="row">
          <label htmlFor="message" className="col-4 mt-4 col-form-label">
            Message
          </label>
          <textarea
            className="form-control col-7 mt-4"
            id="message"
            name="message"
            rows="5"
            onChange={handleChange}
            required
          ></textarea>
        </StyledDiv>
        <StyledDiv className="row">
          <label htmlFor="image" className="col-4 mt-4 col-form-label">
            Image
          </label>
          <input
            type="file"
            className="form-control mt-4 col-7"
            accept=".png,.jpeg, .jpg"
            id="image"
            name="image"
            onChange={handleChange}
          />
        </StyledDiv>
        <StyledDiv className="row">
          <label className="col-4 col-form-label mt-4"></label>
          <div className="col-7 mt-4">
            <img
              style={{ height: '100px' }}
              src={imageLocale}
              alt={currentPost.title}
            />
          </div>
        </StyledDiv>
        <DivButton className="row">
          <div className="col-7"></div>
          <StyledDivButton className="col-4">
            <ButtonComp type="submit">Submit</ButtonComp>
          </StyledDivButton>
        </DivButton>
      </StyledForm>
      <Footer />
    </div>
  )
}
export default NewPost
