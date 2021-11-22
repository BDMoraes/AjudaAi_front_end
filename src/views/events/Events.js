import React, { useEffect, useState } from 'react'
import { findCreatedEvents, getUserId } from 'src/services/services'
import EventList from './EventList'

const MyEvents = () => {
  const [events, setEvents] = useState([])
  const [userId, setUserId] = useState([-1])

  useEffect(() => {
    getEvents()
    setUserId(getUserId())
  }, [])

  const getEvents = async () => {
    const newestEvents = await findCreatedEvents()
    setEvents(newestEvents)
  }

  return <EventList canEdit={false} events={events} refreshEvents={() => getEvents()} />
}

export default MyEvents
