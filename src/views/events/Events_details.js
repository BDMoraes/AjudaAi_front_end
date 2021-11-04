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

const Detail_events = () => {
  const event = {
    pkcodevento: 1,
    titulo: 'evento',
    descricao: 'desc do ',
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
        <CCol xs={12}>
          <h3>{event.descricao}</h3>
        </CCol>
        <CCol xs={12}>
          <h3>{event.localizacao}</h3>
        </CCol>
        <CCol xs={12}>
          <h3>{event.inicio}</h3>
        </CCol>
        <CCol xs={12}>
          <h3>{event.termin}</h3>
        </CCol>
        <CCol xs={12}>
          <h3>{event.categoria}</h3>
        </CCol>
        <CCol md={{ span: 6, offset: 3 }}>
          <img style={{ 'max-height': '200px' }} src={event.imagem} />
        </CCol>
      </CCardBody>
    </CCard>
  )
}

export default Detail_events
