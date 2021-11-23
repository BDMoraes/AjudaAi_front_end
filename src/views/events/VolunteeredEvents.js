import React, { useEffect, useState } from 'react'
import { findVolunteeredEvents } from 'src/services/services'
import EventList from './EventList'

const VolunteeredEvents = () => {
  const [events, setEvents] = useState([])

  useEffect(() => {
    getEvents()
  }, [])

  const getEvents = async () => {
    const newestEvents = await findVolunteeredEvents()
    setEvents(newestEvents)
  }

  return <EventList canEdit={false} events={events} refreshEvents={() => getEvents()} />
}

export default VolunteeredEvents
