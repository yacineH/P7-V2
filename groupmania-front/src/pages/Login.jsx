import React, { useState, useContext, useEffect } from 'react'
import { useHistory, Link } from 'react-router-dom'

import { checkAdmin, checkId } from '../services/authAPI'
import AuthContext from '../contexts/authContext'
import AdminContext from '../contexts/adminContext'
import EmployeeContext from '../contexts/employeeContext'
import Logo from '../assets/dark-logoB.png'
import styled from 'styled-components'
import ButtonComp from '../components/ButtonComp'
import colors from '../utils/colors'

import useFetch from '../hooks/useFetch'
import { URL_LOGIN } from '../utils/config'

//#region Style
const DivLogo = styled.div`
  display: flex;
  justify-content: center;
`
const StyledImage = styled.img`
  width: 250px;
  height: 200px;
`
const DivContainer = styled.div`
  border: 1px solid red;
  display: flex;
  border-radius: 20px;
  height: 400px;
`
const DivBienvenue = styled.div`
  height: 398px;
  background-color: ${colors.secondary};
  border-top-left-radius: 20px;
  border-bottom-left-radius: 20px;
  text-align: center;
`
//#endregion
export default function Login() {
  //#region declarations
  const [{ response, error }, doFetch] = useFetch(URL_LOGIN)
  const history = useHistory()
  const [credentiels, setCredentiels] = useState({
    email: '',
    password: '',
  })
  const { setIsAuthenticated } = useContext(AuthContext)
  const { setIsAdmin } = useContext(AdminContext)
  const { setEmployeeId } = useContext(EmployeeContext)
  const [isError, setIsError] = useState(false)
  const msgError = '* Email ou mot de pass incorrect'
  //#endregion
  //#region events
  const handleChange = (event) => {
    const { name, value } = event.target
    setCredentiels({
      ...credentiels,
      [name]: value,
    })
  }

  const handleSubmit = async (event) => {
    event.preventDefault()

    await doFetch({
      method: 'post',
      data: {
        email: credentiels.email,
        password: credentiels.password,
      },
    })
  }
  //#endregion
  //#region hook
  useEffect(() => {
    if (error) setIsError(true)
    else if (response) {
      setIsAdmin(checkAdmin)
      setIsAuthenticated(true)
      setEmployeeId(checkId)
      window.localStorage.setItem('token', response.token)
      history.replace('home')
    }
  }, [response, error, setIsAdmin, setIsAuthenticated, setEmployeeId, history])
  //#endregion
  //#region render
  return (
    <div>
      <DivLogo>
        <StyledImage src={Logo} alt="Logo-groupomania" />
      </DivLogo>
      <DivContainer className="container">
        <div className="row">
          <DivBienvenue className="col-7">
            <h1 style={{ marginTop: '15%' }}>
              Bienvenue sur l'intranet de Groupomania
            </h1>
            <p style={{ marginTop: '30px' }}>
              Vous n'avez pas de compte ?{' '}
              <Link to="/register">Inscrivez-vous</Link>
            </p>
          </DivBienvenue>

          <form className="col-5" onSubmit={handleSubmit}>
            <div style={{ marginTop: '35px' }} className="row">
              <div className="form-group col-12">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  name="email"
                  placeholder="name@example.com"
                  className="form-control"
                  id="email"
                  required
                  aria-describedby="emailHelp"
                  onChange={handleChange}
                />
              </div>
              <div className="form-group col-12 mt-4">
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  className="form-control"
                  id="password"
                  name="password"
                  required
                  onChange={handleChange}
                  autoComplete="off"
                />
              </div>
              <div className="col-12 mt-5 text-center">
                <ButtonComp type="submit">Login</ButtonComp>
              </div>
            </div>
            <div
              style={{
                marginTop: '15px',
                textAlign: 'center',
              }}
            >
              {isError ? <p style={{ color: 'red' }}>{msgError}</p> : ''}
            </div>
          </form>
        </div>
      </DivContainer>
    </div>
  )
  //#endregion
}
