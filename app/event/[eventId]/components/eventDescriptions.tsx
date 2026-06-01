"use client";

import type { Event } from "@/types/api.types";
import { AccordionItem, AccordionItemContent, AccordionItemTrigger, AccordionRoot } from "@/components/ui/accordion";
import { Center, Flex, Heading, Stack, Text } from "@chakra-ui/react";
import { useState } from "react";

export default function EventDescription({ event }: { event: Event }) {
  const [toggleWord, setToggleWord] = useState("See more");
  const handleToggleWord = () =>
    toggleWord === "See more" ? setToggleWord("See less") : setToggleWord("See more");

  return (
    <Flex mb="10vh" ml={{ base: 0, lg: "4vw" }} direction="column">
      <Heading size="3xl" mb="3vh">
        {event.title}
      </Heading>
      <Center>
        <AccordionRoot collapsible onClick={handleToggleWord} w="full">
          <AccordionItem key="description" value="description" onClick={handleToggleWord}>
            <AccordionItemTrigger>
              <Stack>
                <Text w={{ base: "100%", lg: "30vw" }}>
                  The event everyone is talking about… Will you be there?
                </Text>
                <Text fontSize="sm" color="fg.muted">
                  {toggleWord}
                </Text>
              </Stack>
            </AccordionItemTrigger>
            <AccordionItemContent>
              {event.description ||
                `Join ${event.title} for a unique experience, full of discoveries and interactions, in a friendly and dynamic atmosphere!`}
            </AccordionItemContent>
          </AccordionItem>
        </AccordionRoot>
      </Center>
    </Flex>
  );
}
