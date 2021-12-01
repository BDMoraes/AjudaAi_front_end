import {
  CButton,
  CCard,
  CCardBody,
  CCol,
  CDropdown,
  CDropdownDivider,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
  CForm,
  CFormCheck,
  CFormInput,
  CFormLabel,
  CRow,
} from '@coreui/react'
import React, { useEffect, useState } from 'react'
import EventDetails from './EventDetails'
import EventEdit from './EventEdit'
import PropTypes from 'prop-types'
import CIcon from '@coreui/icons-react'
import { cilSearch } from '@coreui/icons'

const EventList = ({ events, canEdit, canVolunteer, refreshEvents, filterEvents }) => {
  const [selectedEvent, setSelectedEvent] = useState()
  const [page, setPage] = useState('gallery')
  const [filter, setFilter] = useState('ALL')

  useEffect(() => {
    filterEvents(filter === 'ALL' ? undefined : filter)
  }, [filter])

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
        canVolunteer={canVolunteer}
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
    if (!events || events.length < 1) return <div>Nenhum evento encontrado.</div>
    if (page === 'gallery') return renderEventsGallery()
    if (page === 'detail') return renderEventDetail()
    if (page === 'edit') return renderEventEdit()
  }

  const formatEventDate = (date, hour) => {
    const dateParts = date.split('-')
    return `${dateParts[2]}/${dateParts[1]}/${dateParts[0]} ${hour}`
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
                    <div className="small text-medium-emphasis">{`De: ${formatEventDate(
                      event.dataInicio,
                      event.horaInicio,
                    )}`}</div>
                    <div className="small text-medium-emphasis">{`Até: ${formatEventDate(
                      event.dataTermino,
                      event.horaTermino,
                    )}`}</div>
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
                  <CCol md={{ span: 12 }} style={{ alignItems: 'center' }}>
                    <img style={{ maxWidth: '100%' }} src={event.imagem} alt="event banner" />
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

  const FILTER_OPTIONS = [
    { value: 'ALL', label: 'Todos' },
    { value: 'MAO_DE_OBRA', label: 'Mão de obra' },
    { value: 'AJUDA_FINANCEIRA', label: 'Ajuda financeira' },
    { value: 'ALIMENTOS', label: 'Alimentos' },
    { value: 'ROUPAS', label: 'Roupas' },
    { value: 'OUTROS', label: 'Outros' },
  ]

  const renderContent = () => {}

  const renderFilter = () => {
    return (
      <CDropdown>
        <CDropdownToggle color="info">
          Filtrar <CIcon icon={cilSearch} />
        </CDropdownToggle>
        <CDropdownMenu>
          {FILTER_OPTIONS.map((item, index) => (
            <CDropdownItem
              key={item}
              style={{ cursor: 'pointer' }}
              onClick={() => setFilter(item.value)}
              active={item.value === filter}
            >
              {item.label}
            </CDropdownItem>
          ))}
        </CDropdownMenu>
      </CDropdown>
    )
  }

  return (
    <div style={{ width: '100%' }}>
      {renderFilter()}
      <div
        style={{
          maxWidth: 1320,
          marginRight: 'auto',
          marginLeft: 'auto',
        }}
      >
        {renderPage()}
      </div>
    </div>
  )
}

EventList.propTypes = {
  events: PropTypes.array,
  canEdit: PropTypes.func,
  refreshEvents: PropTypes.func,
  filterEvents: PropTypes.func,
  canVolunteer: PropTypes.bool,
}

export default EventList
