"use client"

import { Center, Flex, Heading, Stack, Text } from "@chakra-ui/react";
import { AccordionItem, AccordionItemContent, AccordionItemTrigger, AccordionRoot, } from "@/components/ui/accordion";
import { useState } from "react";
import Event from "../../../../../../Back-end/api/entity/Event";


export default function EventDescription({event}: {event: Event}) {
    const [toggleWord, setToggleWord] = useState("Voir plus");
    const handleToggleWord = () =>  toggleWord == "Voir plus"? setToggleWord("Voir moins") : setToggleWord("Voir plus");
    const description: string = event.description;

    return (
        <Flex mb="10vh" ml="4vw" direction="column">
            <Heading size="3xl" mb="3vh">{event.title}</Heading>
            <Center>
                <AccordionRoot collapsible onClick={handleToggleWord}>
                    <AccordionItem key="1" value="test" onClick={handleToggleWord}>
                        <AccordionItemTrigger >
                            <Stack>
                                <Text truncate w="30vw">{description}</Text>
                                <Text fontSize="sm" color="fg.muted" ml="80vw">
                                    {toggleWord}
                                </Text>
                            </Stack>
                        </AccordionItemTrigger>
                        <AccordionItemContent >
                            {description}
                        </AccordionItemContent>
                    </AccordionItem>
                </AccordionRoot>
            </Center>
        </Flex>
    )
}