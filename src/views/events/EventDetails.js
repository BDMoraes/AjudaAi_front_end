import React from 'react'
import { CButton, CCard, CCardBody, CCol, CRow, CCardHeader } from '@coreui/react'
import PropTypes from 'prop-types'
import { deleteEvent, getUserId, unvolunteerOnEvent, volunteerOnEvent } from 'src/services/services'

const EventDetails = ({ event, onBack, onEdit, onDeleteEvent, onVolunteer, onUnvolunteer }) => {
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

  const userId = getUserId()
  const canEdit = !!onEdit
  const isVolunteer = event.participa !== 'false'
  const canVolunteer = !canEdit && event?.criador !== userId && !isVolunteer
  const canUnvolunteer = !canEdit && event?.criador !== userId && isVolunteer

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
            <h4>{getDateFormatted(event.dataInicio, event.horaInicio)}</h4>
          </CCol>
        </CRow>
        <CRow className="justify-content-start">
          <CCol xs={4}>
            <h3> Término do evento: </h3>
          </CCol>
          <CCol xs={6}>
            <h4>{getDateFormatted(event.dataTermino, event.horaTermino)}</h4>
          </CCol>
        </CRow>
        <CRow className="justify-content-start">
          <CCol xs={4}>
            <h3> Propósito do evento: </h3>
          </CCol>
          <CCol xs={6}>
            <h4>{getEventCategoryFormatted()}</h4>
          </CCol>
        </CRow>

        {canEdit ? (
          <CRow className="justify-content-start">
            <CCol xs={4}>
              <h3> Inscritos no evento: </h3>
            </CCol>
            {event.voluntarios &&
              event.voluntarios.map((voluntario, index) => (
                <>
                  <CCol key={voluntario + index}></CCol>
                  <CCol xs={6}>
                    <CRow className="justify-content-start">{voluntario.nome ?? ''}</CRow>
                    <CRow className="justify-content-start">{voluntario.telefone ?? ''}</CRow>
                    <CRow className="justify-content-start">{voluntario.email ?? ''}</CRow>
                  </CCol>
                </>
              ))}
          </CRow>
        ) : undefined}
        {/* {!canEdit && (
          <CRow className="justify-content-start">
            <CCol xs={12}>
              <h3> Inscritos no evento: {event?.voluntarios?.length ?? 0}</h3>
            </CCol>
          </CRow>
        )} */}
        <CRow className="justify-content-center">
          <div className="d-grid gap-2">
            {canVolunteer && (
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
}

export default EventDetails
