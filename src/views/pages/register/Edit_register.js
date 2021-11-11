import React, { useRef, useState } from 'react'
import { useHistory } from 'react-router-dom'
import {
  CButton,
  CCard,
  CCardBody,
  CCol,
  CContainer,
  CForm,
  CFormFeedback,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CRow,
  CToast,
  CToastBody,
  CToaster,
  CToastHeader,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilCalendar, cilLockLocked, cilPhone, cilText } from '@coreui/icons'
import { createUser } from 'src/services/services'

const Edit_register = () => {
  const history = useHistory()
  const [toast, addToast] = useState(0)

  const toaster = useRef()

  const [form, setForm] = useState({
    fullName: '',
    phone: '',
    email: '',
    birthdate: '',
    password: '',
    repeatPassword: '',
  })
  const [validated, setValidated] = useState(false)
  const [repeateadPasswordCorrect, setRepeatedPasswordCorrect] = useState(true)

  const handleSubmit = (event) => {
    if (form.password !== form.repeatPassword) {
      setRepeatedPasswordCorrect(false)
      return
    }

    const validationForm = event.currentTarget
    if (validationForm.checkValidity() === false) {
      event.preventDefault()
      event.stopPropagation()
    }
    setValidated(true)
    if (validationForm.checkValidity() === false) {
      return
    }
    registerUser()
  }

  const registerUser = async () => {
    try {
      const formattedForm = Object.assign({}, form)
      const birthDateParts = formattedForm.birthdate.split('-')
      formattedForm.birthDate = `${birthDateParts[2]}/${birthDateParts[1]}/${birthDateParts[0]}`
      const response = await createUser(formattedForm)
      if (!response) {
        history.push('/login')
      } else {
        showWarning('Ocorreu um erro, tente novamente mais tarde.')
      }
    } catch (error) {
      showWarning('Ocorreu um erro, tente novamente mais tarde.')
      console.log('Something happened loggin in.', error)
    }
  }

  function showWarning(message) {
    addToast(
      <CToast title="Ops!">
        <CToastHeader close>
          <svg
            className="rounded me-2"
            width="20"
            height="20"
            xmlns="http://www.w3.org/2000/svg"
            preserveAspectRatio="xMidYMid slice"
            focusable="false"
            role="img"
          >
            <rect width="100%" height="100%" fill="red"></rect>
          </svg>
          <strong className="me-auto">{'Ops!'}</strong>
        </CToastHeader>
        <CToastBody>{message}</CToastBody>
      </CToast>,
    )
  }

  const handleInputChange = (name, value) => {
    !repeateadPasswordCorrect && setRepeatedPasswordCorrect(true)

    setForm((actualForm) => ({
      ...actualForm,
      [name]: value,
    }))
  }

  return (
    <div className="bg-light min-vh-100 d-flex flex-row align-items-center">
      <CToaster ref={toaster} push={toast} placement="top-end" />
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={9} lg={7} xl={6}>
            <CCard className="mx-4">
              <CCardBody className="p-4">
                <CForm className="needs-validation" validated={validated} onSubmit={handleSubmit}>
                  <h1>Cadastro</h1>
                  <p className="text-medium-emphasis">Edite sua conta</p>
                  <CInputGroup className="mb-3">
                    <CInputGroupText>
                      <CIcon icon={cilText} />
                    </CInputGroupText>
                    <CFormInput
                      required
                      minLength={5}
                      type="text"
                      autoComplete="name"
                      placeholder="Nome completo"
                      value={form.fullName}
                      onChange={(event) => handleInputChange('fullName', event.target.value)}
                    />
                  </CInputGroup>
                  <CInputGroup className="mb-3">
                    <CInputGroupText>
                      <CIcon icon={cilPhone} />
                    </CInputGroupText>
                    <CFormInput
                      required
                      type="tel"
                      minLength={10}
                      autoComplete="tel"
                      placeholder="Telefone"
                      value={form.phone}
                      onChange={(event) => handleInputChange('phone', event.target.value)}
                    />
                  </CInputGroup>
                  <CInputGroup className="mb-3">
                    <CInputGroupText>@</CInputGroupText>
                    <CFormInput
                      required
                      type="email"
                      minLength={5}
                      autoComplete="email"
                      placeholder="Email"
                      value={form.email}
                      onChange={(event) => handleInputChange('email', event.target.value)}
                    />
                  </CInputGroup>
                  <CInputGroup className="mb-3">
                    <CInputGroupText>
                      <CIcon icon={cilCalendar} />
                    </CInputGroupText>
                    <CFormInput
                      type={'date'}
                      required
                      placeholder="Data de nascimento"
                      autoComplete="birthdate"
                      value={form.birthdate}
                      onChange={(event) => handleInputChange('birthdate', event.target.value)}
                    />
                  </CInputGroup>
                  <CInputGroup className="mb-3">
                    <CInputGroupText>
                      <CIcon icon={cilLockLocked} />
                    </CInputGroupText>
                    <CFormInput
                      required
                      type="password"
                      minLength={8}
                      placeholder="Senha"
                      autoComplete="new-password"
                      value={form.password}
                      onChange={(event) => handleInputChange('password', event.target.value)}
                    />
                  </CInputGroup>
                  <CInputGroup className="mb-3 has-validation">
                    <CInputGroupText>
                      <CIcon icon={cilLockLocked} />
                    </CInputGroupText>
                    <CFormInput
                      invalid={!repeateadPasswordCorrect}
                      required
                      type="password"
                      placeholder="Repetir a senha"
                      autoComplete="new-password"
                      value={form.repeatPassword}
                      onChange={(event) => handleInputChange('repeatPassword', event.target.value)}
                    />
                    <CFormFeedback invalid>
                      A senha é diferente da informada anteriormente.
                    </CFormFeedback>
                  </CInputGroup>
                  <CButton color="primary" className="col-sm-12" type={'submit'}>
                    Salvar
                  </CButton>
                </CForm>
              </CCardBody>
            </CCard>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}

export default Edit_register