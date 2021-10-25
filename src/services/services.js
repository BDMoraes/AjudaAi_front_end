const axios = require('axios').default

axios.defaults.baseURL = 'https://appajudaai.herokuapp.com'

export const login = ({ username, password }) => {
  console.log({ username, password })
  console.log('executing login request')

  axios
    .post('/login', { login: username, senha: password })
    .then(function (response) {
      console.log({ response })
      //axios.defaults.headers.common['Authorization'] = `bearer ${user.token}`
      return response.data
    })
    .catch(function (error) {
      return null
    })
}
