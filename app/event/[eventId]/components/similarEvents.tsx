import { Container, Heading, Flex, Box, Image, Icon, Link } from "@chakra-ui/react";
import { FaClock, FaRegCalendarAlt } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import Event from "../../../../../../Back-end/api/entity/Event";


export default function SimilarEvents({ similarEvents }: { similarEvents: Event[] }) {
    return (
        <Container w="99vw" ml="-2vw" p="0">
            <Heading ml="0vw" mb="2vw">EVENTS IN THE SAME CATEGORY  </Heading>


            <Flex w="100%" wrap="wrap" gap="2vh" justify="space-between">
                {
                    similarEvents.map(similar => (
                        <Link href={"/event/" + similar.id} key={similar.id}>
                            <Flex border="2px solid" borderRadius="md" w="30vw" h="37vh" ml="0vw" wrap="wrap">
                                <Image src="https://imagedelivery.net/9bJyCbB5zXavioY-Ay5L6w/ticketplace/image/event/A94598w30640Q27850017L191Y4A54/w=450,h=600" alt="Event image" htmlWidth="200px" mr="2vw"></Image>
                                <Box>
                                    <Heading fontWeight="bold" size="3xl" mt="1.5vh" mb="2vh">{similar.title}</Heading>
                                    <Flex >
                                        <Icon fontSize="2xl">
                                            <FaRegCalendarAlt />
                                        </Icon>
                                        <Heading fontWeight="normal" size="lg" ml="0.5vw">{similar.dateTime}</Heading>
                                    </Flex>
                                    <Flex >
                                        <Icon fontSize="2xl">
                                            <FaClock />
                                        </Icon>
                                        <Heading fontWeight="normal" size="lg" ml="0.5vw">{similar.dateTime}</Heading>
                                    </Flex>
                                    <Flex >
                                        <Icon fontSize="2xl">
                                            <FaLocationDot />
                                        </Icon>
                                        <Heading fontWeight="normal" size="lg" ml="0.5vw" mb="2vh">{similar.location}</Heading>
                                    </Flex>

                                    <Heading fontWeight="normal" size="lg" mb="2vh" color="yellow.400">{similar.category}</Heading>
                                </Box>
                            </Flex>
                        </Link>
                    ))
                }
            </Flex>
        </Container>
    )
}