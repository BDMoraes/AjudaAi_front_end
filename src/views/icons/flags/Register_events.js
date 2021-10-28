import React, { useState } from 'react'
import {
  CButton,
  CCard,
  CCardBody,
  CCol,
  CForm,
  CFormInput,
  CCardHeader,
  CFormLabel,
  CFormSelect,
  CFormFeedback,
  CInputGroupText,
  CInputGroup,
} from '@coreui/react'

const Register_events = () => {
  const [validated, setValidated] = useState(false)
  const handleSubmit = (event) => {
    const form = event.currentTarget
    if (form.checkValidity() === false) {
      event.preventDefault()
      event.stopPropagation()
    }
    setValidated(true)
  }
  return (
    <CCard className="mb-4">
      <CCardHeader>
        <h1>Cadastro de eventos</h1>
      </CCardHeader>
      <CCardBody>
        <CForm
          className="row g-3 needs-validation"
          noValidate
          validated={validated}
          onSubmit={handleSubmit}
        >
          <CCol xs={12}>
            <CFormLabel htmlFor="inputTitulo">Título do evento:</CFormLabel>
            <CFormInput
              type="text"
              id="inputTitulo"
              placeholder="Ex: Campanha de arrecadação de roupas dos guris"
              required
            />
            <CFormFeedback invalid>Insira um nome para o evento.</CFormFeedback>
            <CFormFeedback valid>Título válido</CFormFeedback>
          </CCol>
          <CCol xs={12}>
            <CFormLabel htmlFor="inputDescricao">Descrição do evento:</CFormLabel>
            <CFormInput
              type="text"
              id="inputDescricao"
              placeholder="Ex: Este evento destina-se à arrecadação de..."
              required
            />
            <CFormFeedback invalid>Insira uma descrição válida.</CFormFeedback>
            <CFormFeedback valid>Descrição válida</CFormFeedback>
          </CCol>
          <CCol xs={12}>
            <CFormLabel htmlFor="inputLocalizacao">Localização do evento:</CFormLabel>
            <CFormInput
              type="text"
              id="inputLocalizacao"
              placeholder="Ex: Sapucaia do Sul"
              required
            />
            <CFormFeedback invalid>Insira uma localização válida.</CFormFeedback>
            <CFormFeedback valid>Localização válida</CFormFeedback>
          </CCol>
          <CCol xs={12}>
            <CFormLabel htmlFor="selectCategoria">Categoria do evento:</CFormLabel>
            <CFormSelect id="selectCategoria" required>
              <option value="MAO_DE_OBRA">Mão de obra</option>
              <option value="AJUDA_FINANCEIRA">Ajuda financeira</option>
              <option value="ALIMENTOS">Alimentos</option>
              <option value="ROUPAS">Roupas</option>
              <option value="OUTROS">Outros</option>
            </CFormSelect>
          </CCol>
          <CCol md={6}>
            <CFormLabel htmlFor="inputDataInicio">Data e horário de início:</CFormLabel>
            <CFormInput type="text" id="inputDataInicio" placeholder="24/10/2021 20:50" required />
            <CFormFeedback invalid>Insira uma data válida.</CFormFeedback>
            <CFormFeedback valid>Data válida</CFormFeedback>
          </CCol>
          <CCol md={6}>
            <CFormLabel htmlFor="inputDataTermino">Data e horário de término:</CFormLabel>
            <CFormInput type="text" id="inputDataTermino" placeholder="25/10/2021 20:50" required />
            <CFormFeedback invalid>Insira uma data válida.</CFormFeedback>
            <CFormFeedback valid>Data válida</CFormFeedback>
          </CCol>
          <CCol xs={12}>
            <CFormLabel htmlFor="inputDataInicio">Imagem do evento:</CFormLabel>
            <CInputGroup className="mb-3">
              <CInputGroupText component="label" htmlFor="inputGroupFile01">
                Upload
              </CInputGroupText>
              <CFormInput type="file" id="inputGroupFile01" required />
            </CInputGroup>
          </CCol>
          <CCol md={6}>
            <CButton color="primary" type="submit">
              Registrar
            </CButton>
          </CCol>
        </CForm>
      </CCardBody>
    </CCard>
  )
}

export default Register_events