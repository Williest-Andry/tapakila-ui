import getAllEvents from '@/lib/events/getAllEvents';

export default async function EventsData() {
    const eventsData: Promise<Event[]> =  getAllEvents();
    const events = await eventsData;
  return events;
}
