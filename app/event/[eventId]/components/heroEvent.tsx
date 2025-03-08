import { Flex, Stack, Heading, Wrap, Image, Icon } from "@chakra-ui/react";
import { FaLocationDot } from "react-icons/fa6";
import { FaClock } from "react-icons/fa";
import { FaUserCog } from "react-icons/fa";
import { Event } from "../fetchAction/dateType";


export default function HeroEvent({event}: {event: Event}) {
    return (
        <Flex justify="space-around" mb="10vh">
            <Image rounded="md" src="https://imagedelivery.net/9bJyCbB5zXavioY-Ay5L6w/ticketplace/image/event/3113jo25e5784M08656pp7WE38974C/w=450,h=600" alt="Event image" htmlWidth="500px" htmlHeight="500px"></Image>

            <Flex gap="20vh" direction="column" width="50%">
                <Stack gap="6">
                    <Heading fontWeight="bold" size="5xl">Title</Heading>
                    <Heading fontWeight="normal" size="lg" border="2px solid" borderRadius="md" borderColor="yellow.400" w="7vw" color="yellow.400">Categories</Heading>
                    <Flex >
                        <Icon fontSize="2xl">
                            <FaLocationDot />
                        </Icon>
                        <Heading fontWeight="medium" size="xl" ml="0.8vw">Place</Heading>
                    </Flex>
                    <Flex >
                        <Icon fontSize="2xl">
                            <FaClock />
                        </Icon>
                        <Heading fontWeight="medium" size="xl" ml="0.8vw">Date</Heading>
                    </Flex>
                    <Flex >
                        <Icon fontSize="2xl">
                        <FaUserCog />
                        </Icon>
                        <Heading fontWeight="medium" size="xl" ml="0.8vw">Organizer</Heading>
                    </Flex>
                </Stack>
                <Wrap>
                    LIMITE D'ACHAT DE BILLET (COMPTEUR)
                </Wrap>
            </Flex>
        </Flex>
    )
}