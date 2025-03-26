import { Button, Center, Container} from "@chakra-ui/react";
import HeroEvent from "./components/heroEvent";
import TicketsTable from "./components/ticketsTable";
import SimilarEvents from "./components/similarEvents";
import EventDescription from "./components/eventDescriptions";
import Ticket from "../../../../../Back-end/api/entity/Ticket";
import Event from "../../../../../Back-end/api/entity/Event";
import getEventById from "@/lib/events/getEventById";
import getAllTickets from "@/lib/tickets/getAllTickets";
import getAllEvents from "@/lib/events/getAllEvents";

export default async function EventPage({ params }: { params: Promise<{ eventId: string }> }) {
    const eventId = (await params).eventId;
    const event: Event = await getEventById(eventId);
    const tickets: Ticket[] = await getAllTickets();
    const eventTicket = tickets.filter(ticket => ticket.idEvent == eventId);
    const eventCategory = event.category;
    const events: Event[] = await getAllEvents();
    const similarEvents = events.filter(similar => similar.category == eventCategory && JSON.stringify(similar) != JSON.stringify(event));
    console.log(similarEvents);
    

    return (
        <Container>
            <HeroEvent event={event}/>

            <EventDescription event={event}/>

            <TicketsTable tickets={eventTicket}/>

            <Center mb="10vh">
                <Button colorPalette="blue" variant="outline" size="lg" w="10vw">
                    <a href="#">Réserver</a>
                </Button>
            </Center>

            <SimilarEvents similarEvents={similarEvents}/>

        </Container>
    )
}