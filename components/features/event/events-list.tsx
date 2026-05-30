"use client";

import { Grid, Text, Center } from "@chakra-ui/react";
import { EventsGridSkeleton } from "@/components/ui/skeletons";
import { useEvents } from "@/lib/api/queries/events.queries";
import { useSearchParams } from "next/navigation";
import EventCard from "@/app/components/events/event-card";

export default function EventsList() {
  const searchParams = useSearchParams();
  const search = searchParams.get("search") ?? undefined;
  const categoryId = searchParams.get("categoryId") ?? undefined;

  const { data, error, isPending } = useEvents({
    search,
    categoryId,
    limit: 20,
  });

  if (isPending) return <EventsGridSkeleton count={6} />;

  if (error)
    return (
      <Center py={20}>
        <Text color="red.500">Error loading events</Text>
      </Center>
    );

  const events = Array.isArray(data) ? data : (data?.data ?? []);

  if (events.length === 0)
    return (
      <Center py={20}>
        <Text color="gray.400">No events found</Text>
      </Center>
    );

  return (
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
  );
}
