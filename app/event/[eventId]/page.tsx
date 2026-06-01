import { Button, Center, Container, Icon, Link } from "@chakra-ui/react";
import { FaArrowLeft } from "react-icons/fa";
import HeroEvent from "./components/heroEvent";
import TicketsTable from "./components/ticketsTable";
import SimilarEvents from "./components/similarEvents";
import EventDescription from "./components/eventDescriptions";
import getEventById from "@/lib/events/getEventById";
import getAllEvents from "@/lib/events/getAllEvents";
import getTicketByEventId from "@/lib/tickets/getTicketByEventId";
import ReservationButton from "./components/reservationButton";

export default async function EventPage({
  params,
}: {
  params: Promise<{ eventId: string }>;
}) {
  const { eventId } = await params;
  const [event, tickets, events] = await Promise.all([
    getEventById(eventId),
    getTicketByEventId(eventId),
    getAllEvents(),
  ]);

  const similarEvents = events
    .filter(
      (similar) =>
        similar.category?.id === event.category?.id && similar.id !== event.id,
    )
    .slice(0, 3);

  return (
    <Container maxW="7xl">
      <Link href="/events" mt={5} mb={5} display="inline-flex">
        <Button>
          <Icon>
            <FaArrowLeft />
          </Icon>
        </Button>
      </Link>
      <HeroEvent event={event} />

      <EventDescription event={event} />

      <TicketsTable tickets={tickets} />

      <Center mb="10vh">
        <ReservationButton eventId={eventId} tickets={tickets} />
      </Center>

      {similarEvents.length > 0 && <SimilarEvents similarEvents={similarEvents} />}
    </Container>
  );
}
