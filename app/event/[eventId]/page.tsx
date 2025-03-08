import { Button, Center, Container} from "@chakra-ui/react";
import HeroEvent from "./components/heroEvent";
import TicketsTable from "./components/ticketsTable";
import SimilarEvents from "./components/similarEvents";
import EventDescription from "./components/eventDescriptions";
import { Event2 } from "./fetchAction/dateType";

export default async function EventPage({ params }: { params: Promise<{ eventId: string }> }) {
    const eventId = (await params).eventId;
    const tickets: string[] = ["silver", "gold", "vip"];
    const similarEvents: string[] = ["silver", "gold", "vip"];
    const events: string[] = ["test"];
    const event:Event2 = {
        id: ""
    }

    return (
        <Container>
            <HeroEvent events={events}/>

            <EventDescription events={events}/>

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