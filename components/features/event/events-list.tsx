"use client";

import { useState } from "react";
import { Center, Grid, Text, Accordion } from "@chakra-ui/react";
import EventCard from "@/components/features/event/event-card";
import EventsFilters from "./events-filters";
import { EventsGridSkeleton } from "@/components/ui/skeletons";
import { useEvents } from "@/lib/api/queries/events.queries";
import { useCategories } from "@/lib/api/queries/events-categories.queries";
import { useSearchParams } from "next/navigation";
import { EventsFilters as EventsQueryFilters } from "@/types/api.types";
import { FaFilter } from "react-icons/fa";

const DEFAULT_FILTERS: EventsQueryFilters = {
  status: "PUBLISHED",
  sortBy: "eventDate",
  sortOrder: "asc",
  limit: 20,
  page: 1,
};

export default function EventsList() {
  const searchParams = useSearchParams();

  const [filters, setFilters] = useState<EventsQueryFilters>({
    ...DEFAULT_FILTERS,
    search: searchParams.get("search") ?? undefined,
    categoryId: searchParams.get("categoryId") ?? undefined,
  });

  const { data, error, isPending } = useEvents(filters);
  const { data: categoriesData } = useCategories();

  const handleFilterChange = (
    key: keyof EventsQueryFilters | string,
    value: string | number | null | undefined,
  ) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value,
      page: 1,
    }));
  };

  const handleReset = () => setFilters(DEFAULT_FILTERS);

  const events = Array.isArray(data) ? data : (data?.data ?? []);
  const categories = Array.isArray(categoriesData)
    ? categoriesData
    : (categoriesData?.data ?? []);

  return (
    <>
      <Accordion.Root collapsible defaultValue={[]} mb={8}>
        <Accordion.Item
          value="filters"
          border="1px solid"
          borderColor="border"
          _dark={{ borderColor: "gray.800" }}
          borderRadius="xl"
          overflow="hidden"
        >
          <Accordion.ItemTrigger
            px={5}
            py={4}
            bg="gray.50"
            _dark={{ bg: "gray.900" }}
            _hover={{ bg: "gray.100", _dark: { bg: "gray.800" } }}
            cursor="pointer"
          >
            <Accordion.ItemIndicator />
            <Text
              fontWeight="semibold"
              fontSize="sm"
              display="flex"
              alignItems="center"
              gap={2}
            >
              <FaFilter size={12} />
              All filters
            </Text>
          </Accordion.ItemTrigger>

          <Accordion.ItemContent>
            <Accordion.ItemBody p={0}>
              <EventsFilters
                filters={filters}
                categories={categories}
                onFilterChange={handleFilterChange}
                onReset={handleReset}
              />
            </Accordion.ItemBody>
          </Accordion.ItemContent>
        </Accordion.Item>
      </Accordion.Root>

      {isPending ? (
        <EventsGridSkeleton count={6} />
      ) : error ? (
        <Center py={20}>
          <Text color="red.500">Error loading events.</Text>
        </Center>
      ) : events.length === 0 ? (
        <Center py={20}>
          <Text color="gray.400">No events found.</Text>
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
    </>
  );
}
