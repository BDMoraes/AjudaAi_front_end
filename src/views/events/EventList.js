import { CButton, CCard, CCardBody, CCol, CRow } from '@coreui/react'
import React, { useEffect, useState } from 'react'
import { findEvents } from 'src/services/services'
import EventDetails from './EventDetails'
import EventEdit from './EventEdit'

const EventList = () => {
  const [selectedEvent, setSelectedEvent] = useState()
  const [events, setEvents] = useState([])
  const [page, setPage] = useState('gallery')

  useEffect(() => {
    getEvents()
  }, [])

  const getEvents = async () => {
    const newestEvents = await findEvents()
    setEvents(newestEvents)
  }

  const openEventDetail = (event) => {
    setSelectedEvent(event)
    setPage('detail')
  }

  const renderEventDetail = () => {
    return (
      <EventDetails
        event={selectedEvent}
        onEdit={() => {
          setPage('edit')
        }}
        onBack={() => {
          setSelectedEvent(undefined)
          setPage('gallery')
        }}
        onDeleteEvent={() => {
          setSelectedEvent(undefined)
          setPage('gallery')
          getEvents()
        }}
      />
    )
  }

  const renderEventEdit = () => {
    return (
      <EventEdit
        event={selectedEvent}
        onBack={() => {
          setPage('detail')
        }}
      />
    )
  }

  const renderPage = () => {
    if (!events) return <div>Nenhum evento a ser listado</div>
    if (page === 'gallery') return renderEventsGallery()
    if (page === 'detail') return renderEventDetail()
    if (page === 'edit') return renderEventEdit()
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
                    <img style={{ maxHeight: '200px' }} src={event.imagem} alt="event banner" />
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

  return <>{renderPage()}</>
}

export default EventList
