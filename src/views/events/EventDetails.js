import React from 'react'
import { CButton, CCard, CCardBody, CCol, CRow, CCardHeader } from '@coreui/react'
import PropTypes from 'prop-types'

const EventDetails = ({ event, onBack }) => {
  if (!event) {
    onBack()
    return
  }

  return (
    <CCard className="mb-4">
      <CCardHeader>
        <h1>{event.titulo}</h1>
      </CCardHeader>
      <CCardBody>
        <CRow className="justify-content-center">
          <CCol md={{ span: 6, offset: 3 }}>
            <img style={{ maxHeight: '300px' }} src={event.imagem} alt="event banner" />
          </CCol>
        </CRow>
        <CRow className="justify-content-start">
          <CCol xs={4}>
            <h3> Descrição: </h3>
          </CCol>
          <CCol xs={6}>
            <h4>{event.descricao}</h4>
          </CCol>
        </CRow>
        <CRow className="justify-content-start">
          <CCol xs={4}>
            <h3> Local: </h3>
          </CCol>
          <CCol xs={6}>
            <h4>{event.localizacao}</h4>
          </CCol>
        </CRow>
        <CRow className="justify-content-start">
          <CCol xs={4}>
            <h3> Início do evento: </h3>
          </CCol>
          <CCol xs={6}>
            <h4>{event.inicio}</h4>
          </CCol>
        </CRow>
        <CRow className="justify-content-start">
          <CCol xs={4}>
            <h3> Térmiono do evento: </h3>
          </CCol>
          <CCol xs={6}>
            <h4>{event.termin}</h4>
          </CCol>
        </CRow>
        <CRow className="justify-content-start">
          <CCol xs={4}>
            <h3> Propósito do evento: </h3>
          </CCol>
          <CCol xs={6}>
            <h4>{event.categoria}</h4>
          </CCol>
        </CRow>
        <CRow className="justify-content-center">
          <div className="d-grid gap-2">
            <CButton color="success">Voluntariar-se</CButton>
            <CButton color="warning">Editar</CButton>
            <CButton color="danger">Excluir evento</CButton>
            <CButton onClick={() => onBack()}>Voltar</CButton>
          </div>
        </CRow>
      </CCardBody>
    </CCard>
  )
}

EventDetails.propTypes = {
  event: PropTypes.object,
  onBack: PropTypes.func,
}

export default EventDetails
