export const API_URL = 'http://localhost:4200/api'

export const URL_ALLPOSTS = API_URL + '/posts'

export const URL_LOGIN = API_URL + '/auth/login'

export const URL_SIGN = API_URL + '/auth/signup'

export const getToken = () => {
  return window.localStorage.getItem('token')
}
