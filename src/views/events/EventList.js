import { CButton, CCard, CCardBody, CCol, CRow } from '@coreui/react'
import React, { useState } from 'react'
import EventDetails from './EventDetails'
import EventEdit from './EventEdit'
import PropTypes from 'prop-types'

const EventList = ({ events, canEdit, refreshEvents }) => {
  const [selectedEvent, setSelectedEvent] = useState()
  const [page, setPage] = useState('gallery')

  const openEventDetail = (event) => {
    setSelectedEvent(event)
    setPage('detail')
  }

  const handleOnEdit = () => {
    setPage('edit')
  }

  const handleOnDelete = () => {
    setSelectedEvent(undefined)
    setPage('gallery')
    refreshEvents()
  }

  const handleOnBack = () => {
    setSelectedEvent(undefined)
    setPage('gallery')
  }

  const handleOnVolunteer = () => {
    refreshEvents()
    setPage('gallery')
  }

  const handleOnUnvolunteer = () => {
    refreshEvents()
    setPage('gallery')
  }

  const handleOnEditted = () => {
    refreshEvents()
    setPage('gallery')
  }

  const renderEventDetail = () => {
    return (
      <EventDetails
        event={selectedEvent}
        onEdit={canEdit ? () => handleOnEdit() : undefined}
        onBack={() => handleOnBack()}
        onDeleteEvent={canEdit ? () => handleOnDelete() : undefined}
        onVolunteer={!canEdit ? () => handleOnVolunteer() : undefined}
        onUnvolunteer={!canEdit ? () => handleOnUnvolunteer() : undefined}
      />
    )
  }

  const renderEventEdit = () => {
    return <EventEdit event={selectedEvent} onBack={() => handleOnEditted()} />
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
                  <CCol sm={5} className="">
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

  if (!events || events.length < 1) {
    return <div>Nenhum evento encontrado.</div>
  }

  return <>{renderPage()}</>
}

EventList.propTypes = {
  events: PropTypes.array,
  canEdit: PropTypes.func,
  refreshEvents: PropTypes.func,
}

export default EventList
