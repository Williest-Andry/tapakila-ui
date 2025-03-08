import { Button, Center, Container} from "@chakra-ui/react";
import HeroEvent from "./components/heroEvent";
import TicketsTable from "./components/ticketsTable";
import SimilarEvents from "./components/similarEvents";
import EventDescription from "./components/eventDescriptions";
import { Event, Ticket } from "./fetchAction/dateType";
import getEventById from "./fetchAction/fetchEvent";
import getTickets from "./fetchAction/fetchTickets";
import getSimilarEvents from "./fetchAction/fetchSimilarEvent";

export default async function EventPage({ params }: { params: Promise<{ eventId: string }> }) {
    const eventId = (await params).eventId;
    const event: Event = getEventById(eventId);
    const tickets: Ticket[] = getTickets(eventId);
    const similarEvents: Event[] = getSimilarEvents(eventId);

    return (
        <Container>
            <HeroEvent event={event}/>

            <EventDescription event={event}/>

            <TicketsTable tickets={tickets}/>

            <Center mb="10vh">
                <Button colorPalette="blue" variant="outline" size="lg" w="10vw">
                    <a href="#">Réserver</a>
                </Button>
            </Center>

            <SimilarEvents similarEvent={similarEvents}/>

        </Container>
    )
}