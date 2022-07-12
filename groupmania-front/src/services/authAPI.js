import jwtDecode from 'jwt-decode'

// export function authenticate(credentiels) {
//       return fetch(URL_LOGIN, {
//             method: 'POST',
//             headers: {
//                   Accept: 'Application/json',
//                   'Content-Type': 'application/json',
//             },
//             body: JSON.stringify({
//                   email: credentiels.email,
//                   password: credentiels.password,
//             }),
//       })
//             .then((res) => res.json())
//             .then((data) => {
//                   window.localStorage.setItem('token', data.token)
//             })
//             .catch((error) => {
//                   console.console.log(error)
//             })
// }

export function isAuth() {
  const token = window.localStorage.getItem('token')
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
  const token = window.localStorage.getItem('token')
  if (token) {
    return jwtDecode(token).employee.admin
  }
  return false
}

export function checkId() {
  const token = window.localStorage.getItem('token')
  let id = ''
  if (token) {
    id = jwtDecode(token).employee.id
  }
  return id
}

// export function register(credentiels) {
//   return fetch(URL_SIGN, {
//     method: 'POST',
//     headers: {
//       Accept: 'Application/json',
//       'Content-Type': 'application/json',
//     },
//     body: JSON.stringify({
//       email: credentiels.email,
//       password: credentiels.password,
//       name: credentiels.name,
//     }),
//   })
//     .then((res) => res.json())
//     .catch((error) => {
//       throw new Error()
//     })
// }
