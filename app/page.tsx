import type { Metadata } from "next";
import { Box } from "@chakra-ui/react";
import Hero from "@/components/features/home/hero";
import EventsPreview from "@/components/features/home/events-preview";
import { Suspense } from "react";
import { EventsGridSkeleton } from "@/components/ui/skeletons";

export const metadata: Metadata = {
  title: "Tapakila - Online Ticket Sales",
  description:
    "Discover and book your tickets for the best events in Madagascar.",
};

export default function HomePage() {
  return (
    <Box>
      <Hero />

      <Box maxW="7xl" mx="auto" px={{ base: 4, md: 8 }} py={16}>
        <Suspense fallback={<EventsGridSkeleton count={3} />}>
          <EventsPreview />
        </Suspense>
      </Box>
    </Box>
  );
}
