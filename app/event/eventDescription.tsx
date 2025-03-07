import { Center, Flex, Heading, Stack, Text } from "@chakra-ui/react";
import { AccordionItem, AccordionItemContent, AccordionItemTrigger, AccordionRoot, } from "@/components/ui/accordion";

export default function EventDescription() {
    return (
        <Flex mb="10vh" ml="5vw" direction="column">
            <Heading size="3xl" mb="3vh">TITLE</Heading>
            <Center>
                <AccordionRoot collapsible>
                    <AccordionItem key="1" value="test">
                        <AccordionItemTrigger >
                            <Stack>
                                <Text truncate w="30vw">(62)If anyone thinks he is something when he is nothing, he deceives himself.</Text>
                                <Text fontSize="sm" color="fg.muted" ml="87vw" w="4vw">
                                    Voir plus
                                </Text>
                            </Stack>
                        </AccordionItemTrigger>
                        <AccordionItemContent >
                        If anyone thinks he is something when he is nothing, he deceives
                            himself. Each one should test his own actions. Then he can take pride in
                            himself, without comparing himself to anyone else.
                            If anyone thinks he is something when he is nothing, he deceives
                            himself. Each one should test his own actions. Then he can take pride in
                            himself, without comparing himself to anyone else.
                            If anyone thinks he is something when he is nothing, he deceives
                            himself. Each one should test his own actions. Then he can take pride in
                            himself, without comparing himself to anyone else.
                            If anyone thinks he is something when he is nothing, he deceives
                            himself. Each one should test his own actions. Then he can take pride in
                            himself, without comparing himself to anyone else.
                        </AccordionItemContent>
                    </AccordionItem>
                </AccordionRoot>
            </Center>
        </Flex>
    )
}