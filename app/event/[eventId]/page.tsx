import { Button, Center, Container} from "@chakra-ui/react";
import HeroEvent from "./heroEvent";
import TicketsTable from "./ticketsTable";
import SimilarEvents from "./similarEvents";

export default async function Event({ params }) {
    const tickets: string[] = ["silver", "gold", "vip"];
    const similarEvents: string[] = ["silver", "gold", "vip"];
    const categories: string[] = ["Live"];

    return (
        <Container>
            <HeroEvent />

            <br></br>
            <br></br>

            <TicketsTable tickets={tickets}/>

            <br></br>
            <br></br>

            <Center>
                <Button colorPalette="blue" variant="outline" size="lg" w="10vw">
                    <a href="#">Réserver</a>
                </Button>
            </Center>

            <br></br>

            <SimilarEvents similarEvent={similarEvents}/>

        </Container>
    )
}