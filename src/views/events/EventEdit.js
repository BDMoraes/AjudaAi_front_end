import React, { useEffect, useState } from 'react'
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
  CRow,
} from '@coreui/react'
import { updateEvent } from 'src/services/services'
import PropTypes from 'prop-types'

const EventEdit = ({ event, onBack }) => {
  useEffect(() => {
    setForm(event)
  }, [event])

  const [form, setForm] = useState({
    titulo: '',
    descricao: '',
    localizacao: '',
    dataInicio: '',
    horaInicio: '',
    dataTermino: '',
    horaTermino: '',
    categoria: 'MAO_DE_OBRA',
    imagem: '',
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
      imagem: base64Image,
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

  const postNewEvent = async () => {
    const updatedEvent = Object.assign({}, event, form)
    const result = await updateEvent(updatedEvent)
    if (result) onBack()
  }

  return (
    <CCard className="mb-4">
      <CCardHeader>
        <h1>Edição de evento</h1>
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
              value={form.titulo}
              onChange={(event) => handleChange('titulo', event.target.value)}
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
              value={form.descricao}
              onChange={(event) => handleChange('descricao', event.target.value)}
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
              value={form.localizacao}
              onChange={(event) => handleChange('localizacao', event.target.value)}
            />
            <CFormFeedback invalid>Insira uma localização válida.</CFormFeedback>
            <CFormFeedback valid>Localização válida</CFormFeedback>
          </CCol>
          <CCol xs={12}>
            <CFormLabel htmlFor="selectCategoria">Categoria do evento:</CFormLabel>
            <CFormSelect
              id="selectCategoria"
              required
              value={form.categoria}
              onChange={(event) => handleChange('categoria', event.target.value)}
            >
              <option value="MAO_DE_OBRA">Mão de obra</option>
              <option value="AJUDA_FINANCEIRA">Ajuda financeira</option>
              <option value="ALIMENTOS">Alimentos</option>
              <option value="ROUPAS">Roupas</option>
              <option value="OUTROS">Outros</option>
            </CFormSelect>
          </CCol>
          <CCol md={6}>
            <CFormLabel htmlFor="inputDataInicio">Data de início:</CFormLabel>
            <CFormInput
              type="date"
              id="inputDataInicio"
              placeholder="24/10/2021"
              required
              value={form.dataInicio}
              onChange={(event) => handleChange('dataInicio', event.target.value)}
            />
            <CFormFeedback invalid>Insira uma data válida.</CFormFeedback>
            <CFormFeedback valid>Data válida</CFormFeedback>
          </CCol>
          <CCol md={6}>
            <CFormLabel htmlFor="inputHoraInicio">Horário de início:</CFormLabel>
            <CFormInput
              type="time"
              id="inputHoraInicio"
              placeholder="20:50"
              required
              value={form.horaInicio}
              onChange={(event) => handleChange('horaInicio', event.target.value)}
            />
            <CFormFeedback invalid>Insira uma hora válida.</CFormFeedback>
            <CFormFeedback valid>Hora válida</CFormFeedback>
          </CCol>
          <CCol md={6}>
            <CFormLabel htmlFor="inputDataTermino">Data de término:</CFormLabel>
            <CFormInput
              type="date"
              id="inputDataTermino"
              placeholder="25/10/2021"
              required
              value={form.dataTermino}
              onChange={(event) => handleChange('dataTermino', event.target.value)}
            />
            <CFormFeedback invalid>Insira uma data válida.</CFormFeedback>
            <CFormFeedback valid>Data válida</CFormFeedback>
          </CCol>
          <CCol md={6}>
            <CFormLabel htmlFor="inputHoraTermino">Horário de término:</CFormLabel>
            <CFormInput
              type="time"
              id="inputHoraTermino"
              placeholder="20:50"
              required
              value={form.horaTermino}
              onChange={(event) => handleChange('horaTermino', event.target.value)}
            />
            <CFormFeedback invalid>Insira uma hora válida.</CFormFeedback>
            <CFormFeedback valid>Hora válida</CFormFeedback>
          </CCol>
          <CCol xs={12}>
            <CFormLabel htmlFor="inputDataInicio">Imagem do evento:</CFormLabel>
            <CInputGroup
              className="mb-3"
              value={form.imagem}
              onChange={(event) => handleImageChange(event)}
            >
              <CInputGroupText component="label" htmlFor="inputGroupFile01">
                Upload
              </CInputGroupText>
              <CFormInput type="file" id="inputGroupFile01" />
            </CInputGroup>

            <CFormLabel htmlFor="inputDataInicio">Imagem atual:</CFormLabel>
            <CRow className="justify-content-center">
              <CCol md={{ span: 6, offset: 3 }}>
                <img style={{ maxHeight: '300px' }} src={event.imagem} alt="event banner" />
              </CCol>
            </CRow>
          </CCol>
          <div className="d-grid gap-2">
            <CButton color="primary" type="submit">
              Salvar
            </CButton>
            <CButton color="danger" onClick={() => onBack()}>
              Voltar
            </CButton>
          </div>
        </CForm>
      </CCardBody>
    </CCard>
  )
}

EventEdit.propTypes = {
  event: PropTypes.object,
  onBack: PropTypes.func,
}

export default EventEdit
