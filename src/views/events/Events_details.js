import React, { useState } from 'react'
import {
  CButton,
  CCard,
  CCardBody,
  CCol,
  CRow,
  CForm,
  CFormInput,
  CCardHeader,
  CFormLabel,
  CFormSelect,
  CFormFeedback,
  CInputGroupText,
  CInputGroup,
} from '@coreui/react'

const Detail_events = () => {
  const event = {
    pkcodevento: 1,
    titulo: 'evento',
    descricao:
      'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.',
    localizacao: 'Taquara',
    datahora: '03/11/2021, 23:03',
    inicio: '24/10/2021 20:50',
    termin: '24/10/2021 20:55',
    imagem:
      'http://s2.glbimg.com/z_gIOSUdsxyNGClgVLYVBHBziyw=/0x0:400x400/400x400/s.glbimg.com/po/tt2/f/original/2016/05/20/new-google-favicon-logo.png',
    categoria: 'TESTE2',
    criador: 1,
    ativo: true,
  }

  return (
    <CCard className="mb-4">
      <CCardHeader>
        <h1>{event.titulo}</h1>
      </CCardHeader>
      <CCardBody>
        <CRow className="justify-content-center">
          <CCol md={{ span: 6, offset: 3 }}>
            <img style={{ 'max-height': '300px' }} src={event.imagem} />
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
            <CButton color="success">Participar</CButton>
            <CButton color="danger">Voltar</CButton>
          </div>
        </CRow>
      </CCardBody>
    </CCard>
  )
}

export default Detail_events
