import React, { lazy, useEffect, useState } from 'react'

import { CButton, CCard, CCardBody, CCol, CRow } from '@coreui/react'
import EventDetails from './EventDetails'

import { findEvents } from 'src/services/services'

const Events = () => {
  const [selectedEvent, setSelectedEvent] = useState()
  const [events, setEvents] = useState([])

  useEffect(() => {
    const getEvents = async () => {
      const newestEvents = await findEvents()
      setEvents(newestEvents)
    }
    getEvents()
  }, [])

  const openEventDetail = (event) => {
    setSelectedEvent(event)
  }

  const renderEventsGallery = () => {
    return (
      <CRow>
        {events.map((event, index) => (
          <CCol sm={4} key={event.titulo + index}>
            <CCard className="sm-6 lg-3 mb-4">
              <CCardBody>
                <CRow>
                  <CCol sm={7}>
                    <h4 id="traffic" className="card-title mb-0">
                      {event.titulo}
                    </h4>
                    <div className="small text-medium-emphasis">{`De: ${event.inicio}`}</div>
                    <div className="small text-medium-emphasis">{`Até: ${event.termino}`}</div>
                    <div className="small text-medium-emphasis">{`Localização: ${event.localizacao}`}</div>
                  </CCol>
                  <CCol sm={5} className="d-none d-md-block">
                    <CButton
                      color="success"
                      className="float-end"
                      onClick={() => openEventDetail(event)}
                    >
                      Detalhar
                    </CButton>
                  </CCol>
                </CRow>
                <CRow>
                  <CCol md={{ span: 6, offset: 3 }}>
                    <img style={{ 'max-height': '200px' }} src={event.imagem} />
                  </CCol>
                </CRow>
                <CRow>
                  <CCol md={12}>
                    <div>{event.descricao}</div>
                  </CCol>
                </CRow>
              </CCardBody>
            </CCard>
          </CCol>
        ))}
      </CRow>
    )
  }

  const renderEventDetail = () => {
    return <EventDetails event={selectedEvent} onBack={() => setSelectedEvent(undefined)} />
  }

  return <>{selectedEvent ? renderEventDetail() : renderEventsGallery()}</>
}

export default Events
