import { URL_ALLPOSTS } from '../utils/config'

function fetchLike(id, vote, idEmployee) {
  const token = window.localStorage.getItem('token')
  var chemin = new URL(URL_ALLPOSTS + `/${id}/like`)

  return fetch(chemin, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      employeeId: idEmployee,
      like: vote,
    }),
  })
    .then((res) => {
      res.json()
    })
    .catch((err) => console.log(err))
}

export { fetchLike }
