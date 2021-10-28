import React, { useState } from 'react'
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
  CFormLabel,
  CInputGroup,
  CInputGroupText,
  CRow,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilCalendar, cilLockLocked, cilPhone, cilText, cilUser } from '@coreui/icons'
import { createUser } from 'src/services/services'

const Register = () => {
  const history = useHistory()

  const [form, setForm] = useState({
    fullName: '',
    phone: '',
    email: '',
    age: '',
    password: '',
    repeatPassword: '',
  })
  const [validated, setValidated] = useState(false)
  const [repeateadPasswordCorrect, setRepeatedPasswordCorrect] = useState(true)

  const handleSubmit = (event) => {
    if (form.password !== form.repeatPassword) {
      setRepeatedPasswordCorrect(false)
    }

    const validationForm = event.currentTarget
    if (validationForm.checkValidity() === false) {
      event.preventDefault()
      event.stopPropagation()
    }
    setValidated(true)
    registerUser()
  }

  const registerUser = async () => {
    try {
      ;(await createUser(form)) && history.push('/login')
    } catch (error) {
      console.log('Something happened loggin in.', error)
    }
  }

  const handleInputChange = (name, value) => {
    console.log(name, value, form)

    !repeateadPasswordCorrect && setRepeatedPasswordCorrect(true)

    setForm((actualForm) => ({
      ...actualForm,
      [name]: value,
    }))
  }

  return (
    <div className="bg-light min-vh-100 d-flex flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={9} lg={7} xl={6}>
            <CCard className="mx-4">
              <CCardBody className="p-4">
                <CForm className="needs-validation" validated={validated} onSubmit={handleSubmit}>
                  <h1>Cadastro</h1>
                  <p className="text-medium-emphasis">Crie sua conta</p>
                  <CFormLabel htmlFor="exampleFormControlInput1">Email address</CFormLabel>
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
                      value={form.fullName.value}
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
                      value={form.phone.value}
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
                      value={form.email.value}
                      onChange={(event) => handleInputChange('email', event.target.value)}
                    />
                  </CInputGroup>
                  <CInputGroup className="mb-3">
                    <CInputGroupText>
                      <CIcon icon={cilCalendar} />
                    </CInputGroupText>
                    <CFormInput
                      type={'number'}
                      max={123}
                      min={18}
                      required
                      placeholder="Idade"
                      autoComplete="age"
                      value={form.age.value}
                      onChange={(event) => handleInputChange('age', event.target.value)}
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
                      value={form.password.value}
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
                      placeholder="Senha"
                      autoComplete="new-password"
                      value={form.repeatPassword.value}
                      onChange={(event) => handleInputChange('repeatPassword', event.target.value)}
                    />
                    <CFormFeedback invalid>
                      A senha é diferente da informada anteriormente.
                    </CFormFeedback>
                  </CInputGroup>
                  <CButton color="primary" className="col-sm-12" type={'submit'}>
                    Criar conta
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

export default Register
