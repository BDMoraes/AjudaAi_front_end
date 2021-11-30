import React, { useEffect, useState } from 'react'
import { findEvents } from 'src/services/services'
import EventList from './EventList'

const Events = () => {
  const [events, setEvents] = useState([])

  useEffect(() => {
    getEvents()
  }, [])

  const getEvents = async (filter) => {
    const newestEvents = await findEvents(filter ? { categoria: filter } : {})
    setEvents(newestEvents)
  }

  return (
    <div style={{ width: '100%' }}>
      <EventList
        canEdit={false}
        events={events}
        refreshEvents={() => getEvents()}
        filterEvents={(filter) => getEvents(filter)}
      />
    </div>
  )
}

export default Events
