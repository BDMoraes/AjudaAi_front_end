const axios = require('axios').default

axios.defaults.baseURL = 'https://appajudaai.herokuapp.com'

export const login = async ({ username, password }) => {
  return await axios
    .post('/login', { login: username, senha: password })
    .then(function (response) {
      //axios.defaults.headers.common['Authorization'] = `bearer ${user.token}`
      return true
    })
    .catch(function (error) {
      return false
    })
}

export const createUser = async ({ fullName, phone, email, age, password }) => {
  return await axios
    .post('usuario/create_usuario', {
      login: email,
      senha: password,
      nome: fullName,
      telefone: phone,
      email: email,
      idade: age,
    })
    .then(function (response) {
      return true
    })
    .catch(function (error) {
      return false
    })
}
