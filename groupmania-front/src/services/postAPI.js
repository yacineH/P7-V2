import { URL_ALLPOSTS } from '../utils/config'

// function findPosts(pageNumber) {
//   const token = window.localStorage.getItem('token')
//   const chemin = URL_ALLPOSTS + '/all/' + pageNumber
//   return fetch(chemin, {
//     method: 'GET',
//     headers: {
//       Accept: 'Application/json',
//       Authorization: `Bearer ${token}`,
//     },
//   })
//     .then((res) => res.json())
//     .catch((error) => console.log(error))
// }

// function findPost(id) {
//   const token = window.localStorage.getItem('token')
//   const chemin = URL_ALLPOSTS + '/' + id
//   return fetch(chemin, {
//     method: 'GET',
//     headers: {
//       Accept: 'Application/json',
//       Authorization: `Bearer ${token}`,
//     },
//   }).then((res) => res.json())
// }

function persistPost(post) {
  const token = window.localStorage.getItem('token')
  const formData = new FormData()

  formData.append(
    'post',
    JSON.stringify({
      employeeId: post.employeeId,
      title: post.title,
      message: post.message,
    })
  )

  if (post.image) formData.append('image', post.image)

  return fetch(URL_ALLPOSTS, {
    method: 'POST',
    headers: {
      Accept: '*/*',
      Authorization: `Bearer ${token}`,
    },
    body: formData,
  })
}

// function deletePost(id, empId) {
//   const token = window.localStorage.getItem('token')
//   var chemin = new URL(URL_ALLPOSTS + '/' + id)

//   return fetch(chemin, {
//     method: 'DELETE',
//     headers: {
//       Authorization: `Bearer ${token}`,
//     },
//   }).then((res) => {
//     res.json()
//   })
// }

// function updatePost(post) {
//   const token = window.localStorage.getItem('token')
//   const formData = new FormData()

//   formData.append(
//     'post',
//     JSON.stringify({
//       employeeId: post.employeeId,
//       title: post.title,
//       message: post.message,
//     })
//   )

//   //doit etre le meme nom image dans la config de multer
//   if (post.image) formData.append('image', post.image)

//   var chemin = new URL(URL_ALLPOSTS + '/' + post._id)

//   return fetch(chemin, {
//     method: 'PUT',
//     headers: {
//       Authorization: `Bearer ${token}`,
//     },
//     body: formData,
//   }).then((res) => {
//     res.json()
//   })
// }

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

//export {findPosts,findPost , persistPost, updatePost, deletePost, fetchLike }
export { persistPost, fetchLike }
