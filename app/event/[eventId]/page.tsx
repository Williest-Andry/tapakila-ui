import {Button, Center, Container, Icon, Link} from "@chakra-ui/react";
import HeroEvent from "./components/heroEvent";
import TicketsTable from "./components/ticketsTable";
import SimilarEvents from "./components/similarEvents";
import EventDescription from "./components/eventDescriptions";
import Ticket from "../../../../../Back-end/api/entity/Ticket";
import Event from "../../../../../Back-end/api/entity/Event";
import getEventById from "@/lib/events/getEventById";
import getAllEvents from "@/lib/events/getAllEvents";
import getTicketByEventId from "@/lib/tickets/getTicketByEventId";
import ReservationButton from "./components/reservationButton";
import { FaArrowLeft } from "react-icons/fa";

export default async function EventPage({ params }: { params: Promise<{ eventId: string }> }) {
    const eventId = (await params).eventId;
    const event: Event = await getEventById(eventId);
    const tickets: Ticket[] = await getTicketByEventId(eventId);
    const eventCategory = event.category;
    const events: Event[] = await getAllEvents();
    const similarEvents = events.filter(similar => similar.category == eventCategory && JSON.stringify(similar) != JSON.stringify(event));

    return (
        <Container>
            <Link href="/" mt={5} mb={5}>
                        <Button ><Icon><FaArrowLeft /></Icon></Button>
                    </Link>
            <HeroEvent event={event} />

            <EventDescription event={event} />

            <TicketsTable tickets={tickets} />

            <Center mb="10vh">
                <ReservationButton eventId={eventId} />
            </Center>

            {
                similarEvents ? "" : <SimilarEvents similarEvents={similarEvents} />
            }

        </Container>
    )
}