import type { Metadata } from "next";
import { Suspense } from "react";
import { Box, Container, Heading, Text } from "@chakra-ui/react";
import EventsList from "@/components/features/event/events-list";
import { EventsGridSkeleton } from "@/components/ui/skeletons";

export const metadata: Metadata = {
  title: "Events",
  description: "Check out all the events available on Tapakila.",
};

export default function EventsPage() {
  return (
    <Container maxW="7xl" py={10}>
      <Box mb={8}>
        <Heading size="2xl" fontWeight="bold" mb={2}>
          Events
        </Heading>
        <Text color="text">Check out all the events available on Tapakila</Text>
      </Box>
      <Suspense fallback={<EventsGridSkeleton count={6} />}>
        <EventsList />
      </Suspense>
    </Container>
  );
}
