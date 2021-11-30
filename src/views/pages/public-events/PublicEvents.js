import { CButton } from '@coreui/react'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { findPublicEvents } from 'src/services/services'
import EventList from 'src/views/events/EventList'

const PublicEvents = () => {
  const [events, setEvents] = useState([])

  useEffect(() => {
    getEvents()
  }, [])

  const getEvents = async (filter) => {
    const newestEvents = await findPublicEvents(filter ? { categoria: filter } : {})
    setEvents(newestEvents)
  }

  if (!events || events.length === 0) {
    return (
      <div>
        <Link to="/login">
          <CButton color="primary" className="mt-3" active tabIndex={-1}>
            Entrar
          </CButton>
        </Link>{' '}
        <div>Nenhum evento cadastrado</div>{' '}
      </div>
    )
  }

  return (
    <div style={{ width: '100%', paddingRight: '2%', paddingLeft: '2%' }}>
      <div style={{ marginBottom: 15 }}>
        <Link to="/login">
          <CButton color="primary" className="mt-3" active tabIndex={-1}>
            Entrar
          </CButton>
        </Link>
      </div>

      <EventList
        canEdit={false}
        canVolunteer={false}
        events={events}
        refreshEvents={() => getEvents()}
        filterEvents={(filter) => getEvents(filter)}
      />
    </div>
  )
}

export default PublicEvents
