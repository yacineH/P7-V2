import jwtDecode from 'jwt-decode'

export const API_URL = 'http://localhost:4200/api'

export const URL_ALLPOSTS = API_URL + '/posts'

export const URL_LOGIN = API_URL + '/auth/login'

export const URL_SIGN = API_URL + '/auth/signup'

export const colors = {
  primary: '#FD2D01',
  secondary: '#FFD7D7',
  tertiare: '#4E5166',
}

export const getToken = () => {
  return window.localStorage.getItem('token')
}

export function isAuth() {
  const token = getToken()
  if (token) {
    const { exp } = jwtDecode(token)

    if (exp * 1000 > new Date().getTime()) {
      return true
    }
    return false
  }
  return false
}

export function checkAdmin() {
  const token = getToken()
  if (token) {
    return jwtDecode(token).employee.admin
  }
  return false
}

export function checkId() {
  const token = getToken()
  let id = ''
  if (token) {
    id = jwtDecode(token).employee.id
  }
  return id
}
