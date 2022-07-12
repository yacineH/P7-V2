import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import Logo from '../assets/dark-logoB.png'
import styled from 'styled-components'
import ButtonComp from '../components/ButtonComp'
import colors from '../utils/colors'

import useFetch from '../hooks/useFetch'
import { URL_SIGN } from '../utils/config'

const DivLogo = styled.div`
  display: flex;
  justify-content: center;
`
const StyledImage = styled.img`
  width: 250px;
  height: 200px;
`
const DivH2 = styled.div`
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  background-color: ${colors.secondary};
`
const StyledH2 = styled.h2`
  margin: 0px;
  color: ${colors.tertiare};
  padding-top: 15px;
  padding-bottom: 15px;
  text-align: center;
`
const StyledForm = styled.form`
  border: 1px solid ${colors.secondary};
  height: 350px;
`
const DivButton = styled.div`
  margin-top: 35px;
  text-align: end;
  margin-right: 25px;
`
const DivMessage = styled.div`
  text-align: center;
  margin-top: 30px;
`

export default function NewUser() {
  const [{ response, error }, doFetch] = useFetch(URL_SIGN)

  const history = useHistory()
  const [credentiels, setCredentiels] = useState({
    email: '',
    password: '',
    name: '',
  })

  const [showMessage, setShowMessage] = useState(false)
  const [message, setMessage] = useState('')

  const handleChange = (event) => {
    const { name, value } = event.target
    setCredentiels({
      ...credentiels,
      [name]: value,
    })
  }

  const handleSubmit = async (event) => {
    event.preventDefault()

    doFetch({
      method: 'post',
      data: {
        email: credentiels.email,
        password: credentiels.password,
        name: credentiels.name,
      },
    })
  }

  useEffect(() => {
    if (error) {
      setMessage(error.message)
      setShowMessage(true)
    }
    if (response) history.replace('/')
  }, [response, error, history])

  return (
    <div>
      <DivLogo>
        <StyledImage src={Logo} alt="Logo-groupomania" />
      </DivLogo>
      <div className="container">
        <div className="row">
          <div className="col-2"></div>
          <DivH2 className="col-8">
            <StyledH2>New Employee</StyledH2>
          </DivH2>
          <div className="col-2"></div>
        </div>
        <div className="row">
          <div className="col-2 m-0"></div>
          <StyledForm className="col-8 m-0" onSubmit={handleSubmit}>
            <div className="form-group row mt-4">
              <label htmlFor="name" className="col-4 col-form-label">
                Nom
              </label>
              <input
                type="text"
                name="name"
                className="form-control col-7"
                id="name"
                aria-describedby="nomHelp"
                onChange={handleChange}
              />
            </div>
            <div className="form-group row mt-4">
              <label htmlFor="email" className="col-4 col-form-label">
                Email
              </label>
              <input
                type="email"
                name="email"
                placeholder="name@example.com"
                className="form-control col-7"
                id="email"
                aria-describedby="emailHelp"
                onChange={handleChange}
              />
            </div>
            <div className="form-group row mt-4">
              <label htmlFor="password" className="col-4 col-form-label">
                Password
              </label>
              <input
                type="password"
                className="form-control col-7"
                id="password"
                name="password"
                onChange={handleChange}
              />
            </div>

            <DivButton>
              <ButtonComp type="submit">Submit</ButtonComp>
            </DivButton>
            <DivMessage>
              <p style={{ color: 'red' }}>{showMessage && message}</p>
            </DivMessage>
          </StyledForm>
          <div className="col-2 m-0"></div>
        </div>
      </div>
    </div>
  )
}
