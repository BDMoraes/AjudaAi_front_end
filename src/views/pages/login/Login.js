import React, { useEffect, useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CForm,
  CFormFeedback,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CRow,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilCalendar, cilLockLocked, cilUser } from '@coreui/icons'
import { login, requestPasswordChange } from 'src/services/services'

const Login = () => {
  const history = useHistory()

  const [user, setUser] = useState({})
  const [validated, setValidated] = useState(false)
  const [recoveryValidated, setRecoveryValidated] = useState(false)
  const [page, setPage] = useState('login')

  useEffect(() => {
    const authData = JSON.parse(localStorage.getItem('auth'))

    const isTokenValid = authData?.expireTimestamp && authData.expireTimestamp > +new Date()

    if (isTokenValid) {
      history.push('/events')
    }
  }, [history])

  async function logUser() {
    const result = await login(user)
    if (result) {
      history.push('/events')
    }
  }

  function handleChange(value, field) {
    setUser((actualUser) => ({
      ...actualUser,
      [field]: value,
    }))
  }

  const handleSubmit = (formEvent) => {
    formEvent.preventDefault()
    formEvent.stopPropagation()
    const validationForm = formEvent.currentTarget
    setValidated(true)
    if (validationForm.checkValidity() === false) {
      return
    }
    logUser()
  }

  const handleSubmitPasswordRecovery = (formEvent) => {
    formEvent.preventDefault()
    formEvent.stopPropagation()
    const validationForm = formEvent.currentTarget
    setRecoveryValidated(true)
    if (validationForm.checkValidity() === false) {
      return
    }
    sendPasswordEmail()
  }

  const sendPasswordEmail = async () => {
    const result = await requestPasswordChange(user)
    if (result) returnToLoginPage()
  }

  const returnToLoginPage = () => {
    setPage('login')
    setUser({})
  }

  const renderLogin = () => {
    return (
      <>
        <CCard className="p-4" style={{ display: page === 'login' ? 'block' : 'none' }}>
          <CCardBody>
            <CForm
              id="los"
              className="needs-validation"
              noValidate
              validated={validated}
              onSubmit={handleSubmit}
            >
              <h1>Login</h1>
              <p className="text-medium-emphasis">Entre na sua conta</p>
              <CInputGroup className="mb-3">
                <CInputGroupText>
                  <CIcon icon={cilUser} />
                </CInputGroupText>
                <CFormInput
                  placeholder="Usuário"
                  autoComplete="username"
                  required
                  value={user.username}
                  onChange={(event) => handleChange(event.target.value, 'username')}
                />
                <CFormFeedback invalid>Por favor, preencha o nome de usuário.</CFormFeedback>
              </CInputGroup>
              <CInputGroup className="mb-4">
                <CInputGroupText>
                  <CIcon icon={cilLockLocked} />
                </CInputGroupText>
                <CFormInput
                  type="password"
                  placeholder="Senha"
                  autoComplete="current-password"
                  required
                  value={user.password}
                  onChange={(event) => handleChange(event.target.value, 'password')}
                />
                <CFormFeedback invalid>Por favor, preencha a senha.</CFormFeedback>
              </CInputGroup>
              {/* {errorMessage && (
                      <div className="alert alert-danger" role="alert">
                        {errorMessage}
                      </div>
                    )} */}
              <CRow>
                <CCol xs={6}>
                  <CButton color="primary" className="px-4" type={'submit'}>
                    Entrar
                  </CButton>
                </CCol>
                <CCol xs={6} className="text-right">
                  <CButton color="link" className="px-0" onClick={() => setPage('password')}>
                    Esqueceu a senha?
                  </CButton>
                </CCol>
              </CRow>
            </CForm>
          </CCardBody>
        </CCard>
        <CCard
          className="text-white bg-primary py-5"
          style={{ width: '44%', display: page === 'login' ? 'block' : 'none' }}
        >
          <CCardBody className="text-center">
            <div>
              <h2>Ajuda aí!</h2>
              <p>O site dedicado à fazer sua ação humanitária acontecer.</p>
              <Link to="/register">
                <CButton color="primary" className="mt-3" active tabIndex={-1}>
                  Cadastrar-se agora!
                </CButton>
              </Link>
            </div>
          </CCardBody>
        </CCard>
      </>
    )
  }

  const renderPassword = () => {
    return (
      <>
        <CCard className="p-11" style={{ display: page === 'password' ? 'block' : 'none' }}>
          <CCardBody>
            <CForm
              id="pass"
              className="needs-validation"
              noValidate
              validated={recoveryValidated}
              onSubmit={handleSubmitPasswordRecovery}
            >
              <h1>Recuperar senha</h1>
              <p className="text-medium-emphasis">Recupere sua senha esquecida.</p>
              <CInputGroup className="mb-3">
                <CInputGroupText>@</CInputGroupText>
                <CFormInput
                  required
                  type="email"
                  minLength={5}
                  autoComplete="email"
                  placeholder="Email"
                  value={user.email}
                  onChange={(event) => handleChange(event.target.value, 'email')}
                />
                <CFormFeedback invalid>Por favor, preencha o seu email.</CFormFeedback>
              </CInputGroup>
              <CInputGroup className="mb-3">
                <CInputGroupText>
                  <CIcon icon={cilCalendar} />
                </CInputGroupText>
                <CFormInput
                  type="date"
                  required
                  placeholder="Data de nascimento"
                  autoComplete="birthdate"
                  value={user.birthdate}
                  onChange={(event) => handleChange(event.target.value, 'birthdate')}
                />
              </CInputGroup>
              <CRow>
                <CCol xs={2}>
                  <CButton color="primary" className="px-4" type={'submit'}>
                    Enviar
                  </CButton>
                </CCol>
                <CCol xs={2}>
                  <CButton color="primary" className="px-4" onClick={() => returnToLoginPage()}>
                    Voltar
                  </CButton>
                </CCol>
              </CRow>
            </CForm>
          </CCardBody>
        </CCard>
      </>
    )
  }

  return (
    <div className="bg-light min-vh-100 d-flex flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={8}>
            <CCardGroup>{renderLogin()}</CCardGroup>
            <CCardGroup>{renderPassword()}</CCardGroup>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}

export default Login
