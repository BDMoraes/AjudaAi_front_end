import React, { useRef } from 'react'
import { CToaster } from '@coreui/react'

const axios = require('axios').default

axios.defaults.baseURL = 'https://appajudaai.herokuapp.com'
// axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*'
axios.defaults.headers.post['Access-Control-Allow-Credentials'] = true

let toasterCallbackFunction

export const toasterCallback = (callback) => {
  toasterCallbackFunction = callback
}

export const login = async ({ username, password }) => {
  return await axios
    .post('/login', { login: username, senha: password })
    .then(function (response) {
      //axios.defaults.headers.common['Authorization'] = `bearer ${user.token}`
      return true
    })
    .catch(function (error) {
      toasterCallbackFunction({
        color: 'red',
        title: 'Erro ao realizar login.',
        body: 'Usuário ou senha inválidos.',
      })
      return false
    })
}

export const createUser = async ({ fullName, phone, email, birthDate, password }) => {
  return await axios
    .post('usuario/create_usuario', {
      login: email,
      senha: password,
      nome: fullName,
      telefone: phone,
      email: email,
      datanascimento: birthDate,
    })
    .then(function (response) {
      return true
    })
    .catch(function (error) {
      return false
    })
}

export const findEvents = async () => {
  return await axios
    .get('evento/get_eventos_publicos')
    .then(function (response) {
      return response?.data?.consulta
    })
    .catch(function (error) {
      return false
    })
}

export const createEvent = async ({
  title,
  description,
  location,
  category,
  startDate,
  endDate,
  image,
}) => {
  return await axios
    .post('evento/create_evento', {
      titulo: title,
      descricao: description,
      localizacao: location,
      inicio: startDate,
      termino: endDate,
      categoria: category,
      imagem: image,
    })
    .then(function (response) {
      return true
    })
    .catch(function (error) {
      return false
    })
}
