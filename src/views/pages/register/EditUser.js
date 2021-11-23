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
import React, { useEffect, useState } from 'react'
import { getLoggedUser, updateUser } from 'src/services/services'

const EditUser = () => {
  const [repeateadPasswordCorrect, setRepeatedPasswordCorrect] = useState(true)
  const [user, setUser] = useState({
    nome: '',
    telefone: '',
    email: '',
    datanascimento: '',
    senha: '',
    novaSenha: '',
  })
  const [validated, setValidated] = useState(false)

  useEffect(() => {
    const asyncSetUser = async () => {
      const requestResponse = await getLoggedUser()
      const newestUserData = requestResponse?.consulta[0] ?? {}

      newestUserData.senha = ''
      setUser(newestUserData)
    }
    asyncSetUser()
  }, [])

  const handleSubmit = (event) => {
    event.preventDefault()
    event.stopPropagation()

    const formattedPassword = user.senha ? user.senha : null
    const formattedRepeatedPassword = user.novaSenha ? user.novaSenha : null
    if (formattedPassword !== formattedRepeatedPassword) {
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
    updateUser(user)
  }

  const handleInputChange = (name, value) => {
    !repeateadPasswordCorrect && setRepeatedPasswordCorrect(true)
    setUser((actualUser) => ({
      ...actualUser,
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
                value={user.nome}
                onChange={(event) => handleInputChange('nome', event.target.value)}
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
                value={user.telefone}
                onChange={(event) => handleInputChange('telefone', event.target.value)}
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
                value={user.email}
                onChange={(event) => handleInputChange('email', event.target.value)}
              />
            </CInputGroup>
            <CInputGroup className="mb-3">
              <CInputGroupText>
                <CIcon icon={cilCalendar} />
              </CInputGroupText>
              <CFormInput
                type="date"
                placeholder="Data de nascimento"
                autoComplete="birthdate"
                value={user.datanascimento}
                onChange={(event) => handleInputChange('datanascimento', event.target.value)}
              />
            </CInputGroup>
            <CInputGroup className="mb-3">
              <CInputGroupText>
                <CIcon icon={cilLockLocked} />
              </CInputGroupText>
              <CFormInput
                type="password"
                minLength={8}
                placeholder="Senha"
                autoComplete="new-password"
                value={user.senha}
                onChange={(event) => handleInputChange('senha', event.target.value)}
              />
            </CInputGroup>
            <CInputGroup className="mb-3 has-validation">
              <CInputGroupText>
                <CIcon icon={cilLockLocked} />
              </CInputGroupText>
              <CFormInput
                invalid={!repeateadPasswordCorrect}
                type="password"
                placeholder="Repetir a senha"
                autoComplete="new-password"
                value={user.novaSenha}
                onChange={(event) => handleInputChange('novaSenha', event.target.value)}
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

export default EditUser
