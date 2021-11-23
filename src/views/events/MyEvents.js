import React, { useEffect, useState } from 'react'
import { findCreatedEvents } from 'src/services/services'
import EventList from './EventList'

const MyEvents = () => {
  const [events, setEvents] = useState([])

  useEffect(() => {
    getEvents()
  }, [])

  const getEvents = async () => {
    const newestEvents = await findCreatedEvents()
    setEvents(newestEvents)
  }

  return <EventList canEdit={true} events={events} refreshEvents={() => getEvents()} />
}

export default MyEvents
