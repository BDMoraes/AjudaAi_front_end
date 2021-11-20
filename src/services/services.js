const axios = require('axios').default

axios.defaults.baseURL = 'https://appajudaai.herokuapp.com'
// axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*'
axios.defaults.headers.post['Access-Control-Allow-Credentials'] = true

let toasterCallbackFunction

export const toasterCallback = (callback) => {
  toasterCallbackFunction = callback
}

export const login = async (data) => {
  return await axios
    .post('/login', { login: data.username, senha: data.password })
    .then(function (response) {
      if (response?.data?.token) {
        setToken(response.data.token)
        return true
      }
      return false
    })
    .catch(function (error) {
      if (error?.response?.status === 422) return login(data)
      toasterCallbackFunction({
        color: 'red',
        title: 'Erro ao realizar login.',
        body: 'Usuário ou senha inválidos.',
      })
      return false
    })
}

const setToken = (access_token) => {
  const date = new Date()
  date.setMinutes(date.getMinutes() + 30)

  const key = 'auth'
  const value = JSON.stringify({
    accessToken: access_token,
    expireTimestamp: +date,
  })

  localStorage.setItem(key, value)
}

const getToken = () => {
  const authData = localStorage.getItem('auth')
  if (authData) {
    return `Bearer ${JSON.parse(authData).accessToken}`
  }
  return null
}

const logoutUser = () => {
  localStorage.removeItem('auth')
}

export const createUser = async (data) => {
  return await axios
    .post('usuario/create_usuario', {
      login: data.email,
      senha: data.password,
      nome: data.fullName,
      telefone: data.phone,
      email: data.email,
      datanascimento: data.birthDate,
    })
    .then(function (response) {
      return true
    })
    .catch(function (error) {
      if (error?.response?.status === 422) return createUser(data)

      toasterCallbackFunction({
        color: 'red',
        title: 'Erro ao cadastrar usuário.',
        body: 'Ocorreu um erro, tente novamente mais tarde.',
      })
      return false
    })
}

export const findEvents = async () => {
  return await axios
    .get('evento/get_eventos', {
      headers: {
        Authorization: getToken(),
      },
    })
    .then(function (response) {
      return response?.data?.consulta
    })
    .catch(function (error) {
      if (error?.response?.status === 422) return findEvents()
      if (error?.response?.status === 401) {
        logoutUser()
        return false
      }
      toasterCallbackFunction({
        color: 'red',
        title: 'Erro ao buscar eventos.',
        body: 'Ocorreu um erro, tente novamente mais tarde.',
      })
      return false
    })
}
export const findPublicEvents = async () => {
  return await axios
    .get('evento/get_eventos_publicos')
    .then(function (response) {
      return response?.data?.consulta
    })
    .catch(function (error) {
      if (error?.response?.status === 422) return findPublicEvents()
      toasterCallbackFunction({
        color: 'red',
        title: 'Erro ao buscar eventos.',
        body: 'Ocorreu um erro, tente novamente mais tarde.',
      })
      return false
    })
}

export const createEvent = async (data) => {
  return await axios
    .post(
      'evento/create_evento',
      {
        titulo: data.title,
        descricao: data.description,
        localizacao: data.location,
        inicio: data.startDate,
        termino: data.endDate,
        categoria: data.category,
        imagem: data.image,
      },
      {
        headers: {
          Authorization: getToken(),
        },
      },
    )
    .then(function (response) {
      toasterCallbackFunction({
        color: 'green',
        title: 'Sucesso!',
        body: 'Seu evento foi cadastrado com sucesso.',
      })
      return true
    })
    .catch(function (error) {
      if (error?.response?.status === 422) return createEvent(data)
      toasterCallbackFunction({
        color: 'red',
        title: 'Erro ao cadastrar evento.',
        body: 'Ocorreu um erro, tente novamente mais tarde.',
      })
      return false
    })
}

export const updateEvent = async (data) => {
  return await axios
    .post('evento/update_evento', data, {
      headers: {
        Authorization: getToken(),
      },
    })
    .then(function (response) {
      toasterCallbackFunction({
        color: 'green',
        title: 'Sucesso!',
        body: 'Seu evento foi cadastrado com sucesso.',
      })
      return true
    })
    .catch(function (error) {
      if (error?.response?.status === 422) return updateEvent(data)
      toasterCallbackFunction({
        color: 'red',
        title: 'Erro ao cadastrar evento.',
        body: 'Ocorreu um erro, tente novamente mais tarde.',
      })
      return false
    })
}
