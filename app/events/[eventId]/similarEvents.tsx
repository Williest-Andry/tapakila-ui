import { Container, Heading, Flex, Box, Image } from "@chakra-ui/react";

type SimilarEvent = {
    similarEvent: string[]
}

export default function SimilarEvents({similarEvent} :SimilarEvent) {
    return (
        <Container>
            <Heading m="2vw" border="2px solid" borderColor="red.400">ÉVÉNEMENTS DE MÊME CATÉGORIE </Heading>
            <Flex border="2px solid" borderColor="red.400" w="99vw" wrap="wrap" gap="2vh">
                <Flex border="2px solid" borderColor="red.400" borderRadius="md" w="30vw" h="35vh" ml="2vw" wrap="wrap">
                    <Image src="https://bit.ly/dan-abramov" alt="Event image" htmlWidth="200px" mr="2vw"></Image>
                    <Box>
                        <Heading fontWeight="bold" size="3xl" mt="1.5vh" mb="2vh">Title</Heading>
                        <Heading fontWeight="normal" size="lg">Jour</Heading>
                        <Heading fontWeight="normal" size="lg">Place</Heading>
                        <Heading fontWeight="normal" size="lg" mb="2vh">Date</Heading>
                        <Heading fontWeight="normal" size="lg" border="2px solid" borderRadius="md" borderColor="yellow.400" w="7vw" mb="2vh">Categories</Heading>
                        <Heading fontWeight="bold" size="xl">PRIX</Heading>
                    </Box>
                </Flex>
            </Flex>
        </Container>
    )
}