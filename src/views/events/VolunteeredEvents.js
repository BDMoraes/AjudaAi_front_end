import React, { useEffect, useState } from 'react'
import { findVolunteeredEvents } from 'src/services/services'
import EventList from './EventList'

const VolunteeredEvents = () => {
  const [events, setEvents] = useState([])

  useEffect(() => {
    getEvents()
  }, [])

  const getEvents = async (filter) => {
    const newestEvents = await findVolunteeredEvents(filter ? { categoria: filter } : {})
    setEvents(newestEvents)
  }

  return (
    <EventList
      canEdit={false}
      events={events}
      refreshEvents={() => getEvents()}
      filterEvents={(filter) => getEvents(filter)}
    />
  )
}

export default VolunteeredEvents
