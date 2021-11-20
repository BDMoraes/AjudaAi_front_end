import { cilCalendar, cilLockLocked, cilPhone, cilText } from '@coreui/icons'
import CIcon from '@coreui/icons-react'
import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CForm,
  CFormFeedback,
  CFormInput,
  CInputGroup,
  CInputGroupText,
} from '@coreui/react'
import React, { useState } from 'react'
import { updateUser } from 'src/services/services'

const Edit_register = () => {
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
    event.preventDefault()
    event.stopPropagation()
    if (form.password !== form.repeatPassword) {
      setRepeatedPasswordCorrect(false)
      return
    }

    const validationForm = event.currentTarget
    setValidated(true)
    if (validationForm.checkValidity() === false) {
      return
    }
    handleUserUpdate()
  }

  const handleUserUpdate = async () => {
    const formattedForm = Object.assign({}, form)
    const birthDateParts = formattedForm.birthdate.split('-')
    formattedForm.birthDate = `${birthDateParts[2]}/${birthDateParts[1]}/${birthDateParts[0]}`
    updateUser(formattedForm)
  }

  const handleInputChange = (name, value) => {
    !repeateadPasswordCorrect && setRepeatedPasswordCorrect(true)

    setForm((actualForm) => ({
      ...actualForm,
      [name]: value,
    }))
  }

  return (
    <>
      <CCard className="mb-4">
        <CCardHeader>
          <h1>Edição de cadastro</h1>
        </CCardHeader>
        <CCardBody>
          <CForm className="needs-validation" validated={validated} onSubmit={handleSubmit}>
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
                type="date"
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
              <CFormFeedback invalid>A senha é diferente da informada anteriormente.</CFormFeedback>
            </CInputGroup>
            <div className="d-grid gap-2">
              <CButton color="primary" className="col-sm-12" type={'submit'}>
                Salvar
              </CButton>
            </div>
          </CForm>
        </CCardBody>
      </CCard>
    </>
  )
}

export default Edit_register
