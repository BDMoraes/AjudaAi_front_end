const axios = require('axios').default

axios.defaults.baseURL = 'https://appajudaai.herokuapp.com'
// axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*'
axios.defaults.headers.post['Access-Control-Allow-Credentials'] = true

let toasterCallbackFunction
let showLoaderFunction
let hideLoaderFunction

export const toasterCallback = (callback) => {
  toasterCallbackFunction = callback
}

export const showLoader = (showLoaderCallback) => {
  showLoaderFunction = showLoaderCallback
}

export const hideLoader = (hideLoaderCallback) => {
  hideLoaderFunction = hideLoaderCallback
}

export const login = async (data) => {
  showLoaderFunction()
  return await axios
    .post('/login', { login: data.username, senha: data.password })
    .then(function (response) {
      hideLoaderFunction()
      if (response?.data?.token) {
        setToken(response.data.token)
        return true
      }
      return false
    })
    .catch(function (error) {
      hideLoaderFunction()
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

  const userId = JSON.parse(atob(access_token.split('.')[1])).sub

  const key = 'auth'
  const value = JSON.stringify({
    accessToken: access_token,
    expireTimestamp: +date,
    userId,
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

export const getUserId = () => {
  const authData = localStorage.getItem('auth')
  if (authData) {
    return JSON.parse(authData).userId
  }
  return null
}

const logoutUser = () => {
  localStorage.removeItem('auth')
}

export const createUser = async (data) => {
  showLoaderFunction()
  return await axios
    .post('usuario/create_usuario', {
      login: data.username,
      senha: data.password,
      nome: data.fullName,
      telefone: data.phone,
      email: data.email,
      datanascimento: formatDate(data.birthDate),
    })
    .then(function (response) {
      hideLoaderFunction()
      if (response?.data?.msg === 'Não foram feitas alterações/inserções de Usuário.') {
        toasterCallbackFunction({
          color: 'red',
          title: 'Erro ao cadastrar usuário.',
          body: 'Conta com este usuário ou email já está cadastrada.',
        })
        return false
      }
      if (![200, 201].includes(response.status)) {
        throw new Error()
      }

      toasterCallbackFunction({
        color: 'green',
        title: 'Sucesso!',
        body: 'Usuário cadastrado com sucesso.',
      })
      return true
    })
    .catch(function (error) {
      hideLoaderFunction()
      if (error?.response?.status === 422) return createUser(data)

      toasterCallbackFunction({
        color: 'red',
        title: 'Erro ao cadastrar usuário.',
        body: 'Ocorreu um erro, tente novamente mais tarde.',
      })
      return false
    })
}

export const getLoggedUser = async () => {
  showLoaderFunction()
  return await axios
    .get('usuario/get_usuario', {
      headers: {
        Authorization: getToken(),
      },
    })
    .then(function (response) {
      hideLoaderFunction()
      return response.data
    })
    .catch(function (error) {
      hideLoaderFunction()
      if (error?.response?.status === 422) return getLoggedUser()

      toasterCallbackFunction({
        color: 'red',
        title: 'Erro ao buscar dados do usuário.',
        body: 'Ocorreu um erro, tente novamente mais tarde.',
      })
      return {}
    })
}

export const findEvents = async (filter) => {
  showLoaderFunction()
  return await axios
    .get('evento/get_eventos', {
      params: filter ?? {},
      headers: {
        Authorization: getToken(),
      },
    })
    .then(function (response) {
      hideLoaderFunction()
      return formatDateAndHourToDisplay(response?.data?.consulta)
    })
    .catch(function (error) {
      hideLoaderFunction()
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

export const findCreatedEvents = async (filter) => {
  showLoaderFunction()
  return await axios
    .get('evento/get_eventos_usuario', {
      params: filter ?? {},
      headers: {
        Authorization: getToken(),
      },
    })
    .then(function (response) {
      hideLoaderFunction()
      return formatDateAndHourToDisplay(response?.data?.consulta)
    })
    .catch(function (error) {
      hideLoaderFunction()
      if (error?.response?.status === 422) return findCreatedEvents()
      if (error?.response?.status === 401) {
        logoutUser()
        return false
      }
      toasterCallbackFunction({
        color: 'red',
        title: 'Erro ao buscar eventos criados.',
        body: 'Ocorreu um erro, tente novamente mais tarde.',
      })
      return false
    })
}

export const findVolunteeredEvents = async (filter) => {
  showLoaderFunction()
  return await axios
    .get('evento/get_eventos_usuario_participacao', {
      params: filter ?? {},
      headers: {
        Authorization: getToken(),
      },
    })
    .then(function (response) {
      hideLoaderFunction()
      return formatDateAndHourToDisplay(response?.data?.consulta)
    })
    .catch(function (error) {
      hideLoaderFunction()
      if (error?.response?.status === 422) return findVolunteeredEvents()
      if (error?.response?.status === 401) {
        logoutUser()
        return false
      }
      toasterCallbackFunction({
        color: 'red',
        title: 'Erro ao buscar eventos criados.',
        body: 'Ocorreu um erro, tente novamente mais tarde.',
      })
      return false
    })
}

export const findPublicEvents = async (filter) => {
  showLoaderFunction()
  return await axios
    .get('evento/get_eventos_publicos', {
      params: filter ?? {},
    })
    .then(function (response) {
      hideLoaderFunction()
      return formatDateAndHourToDisplay(response?.data?.consulta)
    })
    .catch(function (error) {
      hideLoaderFunction()
      if (error?.response?.status === 422) return findPublicEvents()
      toasterCallbackFunction({
        color: 'red',
        title: 'Erro ao buscar eventos.',
        body: 'Ocorreu um erro, tente novamente mais tarde.',
      })
      return false
    })
}

const formatDate = (date) => {
  if (!date || date.split('-').length === 0) return date
  const dateParts = date.split('-')
  return `${dateParts[2]}/${dateParts[1]}/${dateParts[0]}`
}

export const createEvent = async (data) => {
  showLoaderFunction()
  return await axios
    .post(
      'evento/create_evento',
      {
        titulo: data.title,
        descricao: data.description,
        localizacao: data.location,
        inicio: formatDateAndHourToRequest(formatDate(data.startDate), data.startHour),
        termino: formatDateAndHourToRequest(formatDate(data.endDate), data.endHour),
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
      hideLoaderFunction()
      if (![200, 201].includes(response.status)) {
        throw new Error()
      }
      toasterCallbackFunction({
        color: 'green',
        title: 'Sucesso!',
        body: 'Seu evento foi cadastrado com sucesso.',
      })
      return true
    })
    .catch(function (error) {
      hideLoaderFunction()
      if (error?.response?.status === 422) return createEvent(data)
      toasterCallbackFunction({
        color: 'red',
        title: 'Erro ao cadastrar evento.',
        body: 'Ocorreu um erro, tente novamente mais tarde.',
      })
      return false
    })
}

const formatDateAndHourToDisplay = (events) => {
  if (events && events.length > 0) {
    return events.map((event) => {
      const fullStartDate = event.inicio || ''
      const fullEndDate = event.termino || ''
      event.dataInicio = fullStartDate.substring(0, 10)
      event.horaInicio = fullStartDate.substring(11, 16)
      event.dataTermino = fullEndDate.substring(0, 10)
      event.horaTermino = fullEndDate.substring(11, 16)
      return event
    })
  }
  return events
}

const formatDateAndHourToRequest = (date, hour) => {
  return `${date} ${hour}:00`
}

export const updateEvent = async (data) => {
  showLoaderFunction()
  return await axios
    .post(
      'evento/update_evento',
      {
        ativo: data.ativo,
        categoria: data.categoria,
        criador: data.criador,
        descricao: data.descricao,
        imagem: data.imagem,
        inicio: formatDateAndHourToRequest(formatDate(data.dataInicio), data.horaInicio),
        termino: formatDateAndHourToRequest(formatDate(data.dataTermino), data.horaTermino),
        localizacao: data.localizacao,
        pkcodevento: data.pkcodevento,
        titulo: data.titulo,
      },
      {
        headers: {
          Authorization: getToken(),
        },
      },
    )
    .then(function (response) {
      hideLoaderFunction()
      if (![200, 201].includes(response.status)) {
        throw new Error()
      }
      toasterCallbackFunction({
        color: 'green',
        title: 'Sucesso!',
        body: 'Seu evento foi cadastrado com sucesso.',
      })
      return true
    })
    .catch(function (error) {
      hideLoaderFunction()
      if (error?.response?.status === 422) return updateEvent(data)
      toasterCallbackFunction({
        color: 'red',
        title: 'Erro ao cadastrar evento.',
        body: 'Ocorreu um erro, tente novamente mais tarde.',
      })
      return false
    })
}

export const volunteerOnEvent = async (pkcodevento) => {
  showLoaderFunction()
  return await axios
    .post(
      'eventousuario/create_evento_usuario',
      {
        pkcodevento: pkcodevento,
      },
      {
        headers: {
          Authorization: getToken(),
        },
      },
    )
    .then(function (response) {
      hideLoaderFunction()
      if (![200, 201].includes(response.status)) {
        throw new Error()
      }
      toasterCallbackFunction({
        color: 'green',
        title: 'Sucesso!',
        body: 'Você se voluntario no evento com sucesso!',
      })

      return true
    })
    .catch(function (error) {
      hideLoaderFunction()
      if (error?.response?.status === 422) return volunteerOnEvent(pkcodevento)

      toasterCallbackFunction({
        color: 'red',
        title: 'Erro ao voluntariar-se em evento.',
        body: 'Ocorreu um erro, tente novamente mais tarde.',
      })
      return false
    })
}

export const unvolunteerOnEvent = async (pkcodevento) => {
  showLoaderFunction()
  return await axios
    .post(
      'eventousuario/delete_evento_usuario',
      {
        pkcodevento: pkcodevento,
      },
      {
        headers: {
          Authorization: getToken(),
        },
      },
    )
    .then(function (response) {
      hideLoaderFunction()
      if (![200, 201].includes(response.status)) {
        throw new Error()
      }
      toasterCallbackFunction({
        color: 'green',
        title: 'Sucesso.',
        body: 'Você não é mais voluntario deste evento.',
      })

      return true
    })
    .catch(function (error) {
      hideLoaderFunction()
      if (error?.response?.status === 422) return unvolunteerOnEvent(pkcodevento)

      toasterCallbackFunction({
        color: 'red',
        title: 'Erro ao desvoluntariar-se em evento.',
        body: 'Ocorreu um erro, tente novamente mais tarde.',
      })
      return false
    })
}

export const deleteEvent = async (pkcodevento) => {
  showLoaderFunction()
  return await axios
    .post(
      'evento/delete_evento',
      { pkcodevento },
      {
        headers: {
          Authorization: getToken(),
        },
      },
    )
    .then(function (response) {
      hideLoaderFunction()
      if (![200, 201].includes(response.status)) {
        throw new Error()
      }
      toasterCallbackFunction({
        color: 'green',
        title: 'Sucesso!',
        body: 'Evento deletado com sucesso.',
      })
      return true
    })
    .catch(function (error) {
      hideLoaderFunction()
      if (error?.response?.status === 422) return deleteEvent(pkcodevento)
      toasterCallbackFunction({
        color: 'red',
        title: 'Erro ao deletar evento.',
        body: 'Ocorreu um erro, tente novamente mais tarde.',
      })
      return false
    })
}

export const updateUser = async (data) => {
  const body = {
    nome: data.nome,
    telefone: data.telefone,
    email: data.email,
    datanascimento: formatDate(data.datanascimento),
  }

  if (data.senha) body.senha = data.senha

  showLoaderFunction()
  return await axios
    .post('usuario/update_usuario', body, {
      headers: {
        Authorization: getToken(),
      },
    })
    .then(function (response) {
      hideLoaderFunction()
      if (![200, 201].includes(response.status)) {
        throw new Error()
      }
      toasterCallbackFunction({
        color: 'green',
        title: 'Sucesso!',
        body: 'Usuário atualizado com sucesso.',
      })
      return true
    })
    .catch(function (error) {
      hideLoaderFunction()
      if (error?.response?.status === 422) return updateUser(data)

      toasterCallbackFunction({
        color: 'red',
        title: 'Erro ao atualizar usuário.',
        body: 'Ocorreu um erro, tente novamente mais tarde.',
      })
      return false
    })
}

export const requestPasswordChange = async (data) => {
  showLoaderFunction()
  return await axios
    .post('recuperar_senha', {
      email: data.email,
      datanascimento: formatDate(data.birthdate),
    })
    .then(function (response) {
      hideLoaderFunction()
      if (![200, 201].includes(response.status)) {
        throw new Error()
      }
      toasterCallbackFunction({
        color: 'green',
        title: 'Sucesso!',
        body: 'Email enviado com sucesso.',
      })

      return true
    })
    .catch(function (error) {
      hideLoaderFunction()
      if (error?.response?.status === 422) return requestPasswordChange(data)

      toasterCallbackFunction({
        color: 'red',
        title: 'Erro ao enviar email de recuperação de senha.',
        body: 'Ocorreu um erro, tente novamente mais tarde.',
      })
      return false
    })
}
