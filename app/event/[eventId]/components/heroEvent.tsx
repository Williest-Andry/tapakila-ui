"use client"

import { Flex, Stack, Heading, Wrap, Image, Icon, Box } from "@chakra-ui/react";
import { FaLocationDot } from "react-icons/fa6";
import { FaClock } from "react-icons/fa";
import { FaUserCog } from "react-icons/fa";
import { Event } from "../fetchAction/dateType";
import { useEffect, useState } from "react";
import Countdown from "./countDown";


export default function HeroEvent({ event }: { event: Event }) {
    const [count, setCount] = useState(0);



    return (
        <Flex justify="space-around" mb="10vh">
            <Image rounded="md" src="https://imagedelivery.net/9bJyCbB5zXavioY-Ay5L6w/ticketplace/image/event/3113jo25e5784M08656pp7WE38974C/w=450,h=600" alt="Event image" htmlWidth="500px" htmlHeight="500px"></Image>

            <Flex gap="15vh" direction="column" width="50%">
                <Stack gap="6">
                    <Heading fontWeight="bold" size="5xl">Title</Heading>
                    <Box>
                        <Heading fontWeight="normal" size="lg" color="yellow.400">Categories</Heading>
                    </Box>
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
                    <Heading>LIMITE D'ACHAT DE BILLET :</Heading>
                    <Countdown targetDate="2025-03-18T08:00:00" />
                </Wrap>
            </Flex>
        </Flex>
    )
}