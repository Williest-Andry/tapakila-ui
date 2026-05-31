"use client";

import {
  Box,
  Button,
  Center,
  Flex,
  Grid,
  Heading,
  Text,
} from "@chakra-ui/react";
import Link from "next/link";
import EventCard from "@/components/features/event/event-card";
import { EventsGridSkeleton } from "@/components/ui/skeletons";
import { useEvents } from "@/lib/api/queries/events.queries";

export default function EventsPreview() {
  const { data, isPending, error } = useEvents({
    status: "PUBLISHED",
    sortBy: "eventDate",
    sortOrder: "desc",
    limit: 3,
  });

  const events = Array.isArray(data) ? data : (data?.data ?? []);

  return (
    <Box>
      <Flex
        justify="space-between"
        align={{ base: "flex-start", sm: "center" }}
        direction={{ base: "column", sm: "row" }}
        gap={4}
        mb={8}
      >
        <Box>
          <Heading
            as="h2"
            fontSize={{ base: "2xl", md: "3xl" }}
            fontWeight="bold"
            mb={1}
          >
            Upcoming events
          </Heading>
          <Text color="text" fontSize="sm">
            {"Don't miss our upcoming events"}
          </Text>
        </Box>

        <Link href="/events">
          <Button
            variant="outline"
            colorPalette="purple"
            size="sm"
            fontWeight="semibold"
            _hover={{ transform: "translateY(-1px)" }}
            transition="all 0.2s"
          >
            See all →
          </Button>
        </Link>
      </Flex>

      {isPending ? (
        <EventsGridSkeleton count={3} />
      ) : error ? (
        <Center py={12}>
          <Text color="danger" fontSize="sm">
            Unable to load events
          </Text>
        </Center>
      ) : events.length === 0 ? (
        <Center py={12}>
          <Text color="text">No upcoming events at this time</Text>
        </Center>
      ) : (
        <Grid
          templateColumns={{
            base: "1fr",
            sm: "repeat(2, 1fr)",
            lg: "repeat(3, 1fr)",
          }}
          gap={6}
        >
          {events.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </Grid>
      )}

      {events.length > 0 && (
        <Center mt={10}>
          <Link href="/events">
            <Button
              colorPalette="purple"
              size="md"
              fontWeight="semibold"
              px={8}
              _hover={{ transform: "translateY(-1px)" }}
              transition="all 0.2s"
            >
              See all events
            </Button>
          </Link>
        </Center>
      )}
    </Box>
  );
}
