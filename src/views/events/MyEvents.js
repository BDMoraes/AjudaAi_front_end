import React, { useEffect, useState } from 'react'
import { findCreatedEvents } from 'src/services/services'
import EventList from './EventList'

const MyEvents = () => {
  const [events, setEvents] = useState([])

  useEffect(() => {
    getEvents()
  }, [])

  const getEvents = async (filter) => {
    const newestEvents = await findCreatedEvents(filter ? { categoria: filter } : {})
    setEvents(newestEvents)
  }

  return (
    <EventList
      canEdit={true}
      events={events}
      refreshEvents={() => getEvents()}
      filterEvents={(filter) => getEvents(filter)}
    />
  )
}

export default MyEvents
