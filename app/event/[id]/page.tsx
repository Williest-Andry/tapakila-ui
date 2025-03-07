import { Button, Center, Container} from "@chakra-ui/react";
import HeroEvent from "./heroEvent";
import TicketsTable from "./ticketsTable";
import SimilarEvents from "./similarEvents";
import EventDescription from "../eventDescription";

export default async function Event({ params }) {
    const tickets: string[] = ["silver", "gold", "vip"];
    const similarEvents: string[] = ["silver", "gold", "vip"];
    const categories: string[] = ["Live"];

    return (
        <Container>
            <HeroEvent />

            <EventDescription />

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