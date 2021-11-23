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
import { createEvent } from 'src/services/services'

const CreateEvents = () => {
  const [form, setForm] = useState({
    title: '',
    description: '',
    location: '',
    category: 'MAO_DE_OBRA',
    startDate: '',
    endDate: '',
    image: '',
  })

  const [validated, setValidated] = useState(false)

  const handleSubmit = (formEvent) => {
    formEvent.preventDefault()
    formEvent.stopPropagation()
    const validationForm = formEvent.currentTarget
    setValidated(true)
    if (validationForm.checkValidity() === false) {
      return
    }
    postNewEvent()
  }

  const handleChange = (name, value) => {
    setForm((actualForm) => ({
      ...actualForm,
      [name]: value,
    }))
  }

  const handleImageChange = async (event) => {
    const eventImage = event.target.files[0]
    const base64Image = await convertBase64(eventImage)

    setForm((actualForm) => ({
      ...actualForm,
      image: base64Image,
    }))
  }

  const convertBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader()
      fileReader.readAsDataURL(file)
      fileReader.onload = () => {
        resolve(fileReader.result)
      }
      fileReader.onerror = (error) => {
        reject(error)
      }
    })
  }

  const postNewEvent = () => {
    createEvent(form)
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
              value={form.title}
              onChange={(event) => handleChange('title', event.target.value)}
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
              value={form.description}
              onChange={(event) => handleChange('description', event.target.value)}
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
              value={form.location}
              onChange={(event) => handleChange('location', event.target.value)}
            />
            <CFormFeedback invalid>Insira uma localização válida.</CFormFeedback>
            <CFormFeedback valid>Localização válida</CFormFeedback>
          </CCol>
          <CCol xs={12}>
            <CFormLabel htmlFor="selectCategoria">Categoria do evento:</CFormLabel>
            <CFormSelect
              id="selectCategoria"
              required
              value={form.category}
              onChange={(event) => handleChange('category', event.target.value)}
            >
              <option value="MAO_DE_OBRA">Mão de obra</option>
              <option value="AJUDA_FINANCEIRA">Ajuda financeira</option>
              <option value="ALIMENTOS">Alimentos</option>
              <option value="ROUPAS">Roupas</option>
              <option value="OUTROS">Outros</option>
            </CFormSelect>
          </CCol>
          <CCol md={6}>
            <CFormLabel htmlFor="inputDataInicio">Data e horário de início:</CFormLabel>
            <CFormInput
              type="date"
              id="inputDataInicio"
              placeholder="24/10/2021 20:50"
              required
              value={form.startDate}
              onChange={(event) => handleChange('startDate', event.target.value)}
            />
            <CFormFeedback invalid>Insira uma data válida.</CFormFeedback>
            <CFormFeedback valid>Data válida</CFormFeedback>
          </CCol>
          <CCol md={6}>
            <CFormLabel htmlFor="inputDataTermino">Data e horário de término:</CFormLabel>
            <CFormInput
              type="date"
              id="inputDataTermino"
              placeholder="25/10/2021 20:50"
              required
              value={form.endDate}
              onChange={(event) => handleChange('endDate', event.target.value)}
            />
            <CFormFeedback invalid>Insira uma data válida.</CFormFeedback>
            <CFormFeedback valid>Data válida</CFormFeedback>
          </CCol>
          <CCol xs={12}>
            <CFormLabel htmlFor="inputDataInicio">Imagem do evento:</CFormLabel>
            <CInputGroup
              className="mb-3"
              value={form.image}
              onChange={(event) => handleImageChange(event)}
            >
              <CInputGroupText component="label" htmlFor="inputGroupFile01">
                Upload
              </CInputGroupText>
              <CFormInput type="file" id="inputGroupFile01" required />
            </CInputGroup>
          </CCol>
          <div className="d-grid gap-2">
            <CButton color="primary" className="col-sm-12" type={'submit'}>
              Salvar
            </CButton>
          </div>
        </CForm>
      </CCardBody>
    </CCard>
  )
}

export default CreateEvents
