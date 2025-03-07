"use-client"
import getAllEvents from '../../lib/getAllEvents';
import Link from 'next/link';
import React from 'react'

interface Event {
  id: number;
  name: string;
}

const EventsPage = async () => {
  const eventsData: Promise<Event[]> =  getAllEvents();
  const events = await eventsData;
  return (
  <>
    <Link href="/"><h2>Back to home page</h2></Link>
    <h1>Events</h1>
    <ul>
      {events.map((event: Event) => (
        <li key={event.id}><Link href={`/events/${event.id}`}>{event.name}</Link></li>
      ))}
    </ul>
  </>
  )
}

export default EventsPage