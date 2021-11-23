import React, { useEffect, useState } from 'react'
import { findEvents } from 'src/services/services'
import EventList from './EventList'

const MyEvents = () => {
  const [events, setEvents] = useState([])

  useEffect(() => {
    getEvents()
  }, [])

  const getEvents = async () => {
    const newestEvents = await findEvents()
    setEvents(newestEvents)
  }

  return <EventList canEdit={false} events={events} refreshEvents={() => getEvents()} />
}

export default MyEvents
