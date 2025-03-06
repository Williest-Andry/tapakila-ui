import { AbsoluteCenter, Box, Button, Center, Container, Flex, Heading, Image, Stack, Table, Wrap } from "@chakra-ui/react";
import HeroEvent from "./heroEvent";
import TicketsTable from "./ticketsTable";
import SimilarEvents from "./similarEvents";

export default async function Event({ params }) {
    const tickets: string[] = ["silver", "gold", "vip"];
    const similarEvents: string[] = ["silver", "gold", "vip"];

    return (
        <Container>
            <HeroEvent />

            <TicketsTable tickets={tickets}/>

            <Center>
                <Button colorPalette="blue" variant="outline" size="lg" w="10vw">
                    <a href="#">Réserver</a>
                </Button>
            </Center>

            <SimilarEvents similarEvent={similarEvents}/>

        </Container>
    )
}