import React from 'react'
import { CButton, CCard, CCardBody, CCol, CRow, CCardHeader } from '@coreui/react'
import PropTypes from 'prop-types'
import { deleteEvent, getUserId, unvolunteerOnEvent, volunteerOnEvent } from 'src/services/services'

const EventDetails = ({
  event,
  onBack,
  canVolunteer,
  onEdit,
  onDeleteEvent,
  onVolunteer,
  onUnvolunteer,
}) => {
  if (!event) {
    onBack()
    return <div />
  }

  const handleDeleteEvent = async () => {
    const result = await deleteEvent(event.pkcodevento)
    if (result) onDeleteEvent()
  }

  const handleVolunteerOnEvent = async () => {
    const result = await volunteerOnEvent(event.pkcodevento)
    if (result) onVolunteer()
  }

  const handleUnvolunteer = async () => {
    const result = await unvolunteerOnEvent(event.pkcodevento)
    if (result) onUnvolunteer()
  }

  const getEventCategoryFormatted = () => {
    switch (event.categoria) {
      case 'MAO_DE_OBRA':
        return 'Mão de obra'
      case 'AJUDA_FINANCEIRA':
        return 'Ajuda financeira'
      case 'ALIMENTOS':
        return 'Alimentos'
      case 'ROUPAS':
        return 'Roupas'
      case 'OUTROS':
        return 'Outros'
      default:
        return event.categoria
    }
  }

  const getDateFormatted = (date, hour) => {
    const dateParts = date.split('-')
    return `${dateParts[2]}/${dateParts[1]}/${dateParts[0]} ${hour}`
  }

  const renderVolunteerData = (title, value) => {
    return value ? <div>{`${title}: ${value}`}</div> : undefined
  }

  const userId = getUserId()
  const canEdit = !!onEdit
  const isVolunteer = event.participa !== 'false'
  const showVolunteer =
    !canEdit && event?.criador !== userId && !isVolunteer && canVolunteer !== false
  const canUnvolunteer =
    !canEdit && event?.criador !== userId && isVolunteer && canVolunteer !== false

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
        <CRow className="justify-content-start mb-2">
          <CCol xs={4}>
            <h4> Descrição: </h4>
          </CCol>
          <CCol xs={6}>{event.descricao}</CCol>
        </CRow>
        <CRow className="justify-content-start mb-2">
          <CCol xs={4}>
            <h4> Local: </h4>
          </CCol>
          <CCol xs={6}>{event.localizacao}</CCol>
        </CRow>
        <CRow className="justify-content-start mb-2">
          <CCol xs={4}>
            <h4> Início do evento: </h4>
          </CCol>
          <CCol xs={6}>{getDateFormatted(event.dataInicio, event.horaInicio)}</CCol>
        </CRow>
        <CRow className="justify-content-start mb-2">
          <CCol xs={4}>
            <h4> Término do evento: </h4>
          </CCol>
          <CCol xs={6}>{getDateFormatted(event.dataTermino, event.horaTermino)}</CCol>
        </CRow>
        <CRow className="justify-content-start mb-2">
          <CCol xs={4}>
            <h4> Propósito do evento: </h4>
          </CCol>
          <CCol xs={6}>{getEventCategoryFormatted()}</CCol>
        </CRow>

        {canEdit ? (
          <CRow className="justify-content-start mb-2">
            <CCol xs={4}>
              <h4> Inscritos no evento: </h4>
            </CCol>
            <CCol xs={6}>
              {event.voluntarios &&
                event.voluntarios.map((voluntario, index) => (
                  <div key={voluntario + index}>
                    {renderVolunteerData('Nome', voluntario.nome)}
                    {renderVolunteerData('Telefone', voluntario.telefone)}
                    {renderVolunteerData('Email', voluntario.email)}
                    <hr />
                  </div>
                ))}
            </CCol>
          </CRow>
        ) : undefined}
        {/* {!canEdit && (
          <CRow className="justify-content-start">
            <CCol xs={12}>
              <h4> Inscritos no evento: {event?.voluntarios?.length ?? 0}</h4>
            </CCol>
          </CRow>
        )} */}
        <CRow className="justify-content-center">
          <div className="d-grid gap-2">
            {showVolunteer && (
              <CButton color="success" onClick={() => handleVolunteerOnEvent()}>
                Voluntariar-se
              </CButton>
            )}

            {canUnvolunteer && (
              <CButton color="danger" onClick={() => handleUnvolunteer()}>
                Desvoluntariar-se
              </CButton>
            )}
            {canEdit && (
              <>
                <CButton color="warning" onClick={() => onEdit()}>
                  Editar
                </CButton>
                <CButton color="danger" onClick={() => handleDeleteEvent()}>
                  Excluir evento
                </CButton>
              </>
            )}
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
  onEdit: PropTypes.func,
  onDeleteEvent: PropTypes.func,
  onVolunteer: PropTypes.func,
  onUnvolunteer: PropTypes.func,
  canVolunteer: PropTypes.bool,
}

export default EventDetails
