"use client";

import { formatDate } from "@/lib/format-date";
import type { Event } from "@/types/api.types";
import { Box, Flex, Heading, Icon, Image, Stack, Wrap } from "@chakra-ui/react";
import { FaClock, FaUserCog } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import Countdown from "./countDown";

export default function HeroEvent({ event }: { event: Event }) {
  const categoryName = event.category?.name ?? "Event";
  const organizerName = event.organizer
    ? `${event.organizer.firstName} ${event.organizer.lastName}`
    : "Tapakila";
  const imageSrc = event.imageUrl || "/assets/events_image/image1.jpg";

  return (
    <Flex
      justify="space-around"
      gap={{ base: 8, lg: 12 }}
      mb="10vh"
      direction={{ base: "column", lg: "row" }}
    >
      <Image
        rounded="md"
        src={imageSrc}
        alt={`${event.title} image`}
        htmlWidth="500px"
        htmlHeight="500px"
        objectFit="cover"
      />

      <Flex gap={{ base: 8, lg: "15vh" }} direction="column" flex="1">
        <Stack gap="6">
          <Heading fontWeight="bold" size="5xl">
            {event.title}
          </Heading>
          <Box>
            <Heading fontWeight="normal" size="lg" color="yellow.400">
              {categoryName}
            </Heading>
          </Box>
          <Flex>
            <Icon fontSize="2xl">
              <FaLocationDot />
            </Icon>
            <Heading fontWeight="medium" size="xl" ml="0.8vw">
              {event.location}
            </Heading>
          </Flex>
          <Flex>
            <Icon fontSize="2xl">
              <FaClock />
            </Icon>
            <Heading fontWeight="medium" size="xl" ml="0.8vw">
              {formatDate(event.eventDate)}
            </Heading>
          </Flex>
          <Flex>
            <Icon fontSize="2xl">
              <FaUserCog />
            </Icon>
            <Heading fontWeight="medium" size="xl" ml="0.8vw">
              {organizerName}
            </Heading>
          </Flex>
        </Stack>
        <Wrap>
          <Heading>TICKET PURCHASE LIMIT :</Heading>
          <Countdown targetDate={event.eventDate} />
        </Wrap>
      </Flex>
    </Flex>
  );
}
