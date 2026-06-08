"use client";

import {
  Badge,
  Box,
  Button,
  Center,
  Flex,
  Grid,
  Heading,
  HStack,
  NativeSelect,
  Stack,
  Text,
} from "@chakra-ui/react";
import Link from "next/link";
import {
  FaCalendarAlt,
  FaMapMarkerAlt,
  FaPlus,
  FaTicketAlt,
} from "react-icons/fa";
import {
  useMyEvents,
  useUpdateEventStatus,
} from "@/lib/api/queries/events.queries";
import { useAuthStore } from "@/store/auth.store";
import { toaster } from "@/components/ui/toaster";
import type { Event } from "@/types/api.types";

const STATUS_PALETTE: Record<string, string> = {
  DRAFT: "gray",
  PUBLISHED: "green",
  CANCELLED: "red",
};

const dateFormatter = new Intl.DateTimeFormat("fr-FR", {
  day: "numeric",
  month: "long",
  year: "numeric",
});

function EventManagementCard({ event }: { event: Event }) {
  const { mutate: updateStatus, isPending } = useUpdateEventStatus();

  const handleStatusChange = (newStatus: string) => {
    updateStatus(
      { eventId: event.id, status: newStatus as Event["status"] },
      {
        onSuccess: () =>
          toaster.success({
            title: "Status updated",
            description: `Event is now ${newStatus.toLowerCase()}.`,
          }),
        onError: () =>
          toaster.error({
            title: "Error",
            description: "Unable to update the status.",
          }),
      },
    );
  };

  const totalSeats = event.ticketTypes.reduce((s, t) => s + t.totalSeats, 0);
  const availableSeats = event.ticketTypes.reduce(
    (s, t) => s + t.availableSeats,
    0,
  );
  const soldSeats = totalSeats - availableSeats;

  return (
    <Box
      border="1px solid"
      borderColor="border"
      borderRadius="xl"
      p={{ base: 4, md: 5 }}
      bg="white"
      _dark={{ bg: "gray.900", borderColor: "gray.800" }}
      transition="box-shadow 0.2s"
      _hover={{ shadow: "sm" }}
    >
      <Flex justify="space-between" align="flex-start" gap={3} mb={3}>
        <Box flex={1}>
          <Text fontWeight="bold" fontSize="md" lineClamp={1} mb={1}>
            {event.title}
          </Text>
          <HStack gap={2} wrap="wrap">
            <Badge colorPalette="purple" variant="subtle" fontSize="xs">
              {event.category.name}
            </Badge>
            <Badge
              colorPalette={STATUS_PALETTE[event.status]}
              variant="solid"
              fontSize="xs"
            >
              {event.status}
            </Badge>
          </HStack>
        </Box>
      </Flex>

      <Stack gap={1} mb={4}>
        <HStack gap={2}>
          <FaCalendarAlt size={11} color="gray" />
          <Text fontSize="xs" color="text">
            {dateFormatter.format(new Date(event.eventDate))}
          </Text>
        </HStack>
        <HStack gap={2}>
          <FaMapMarkerAlt size={11} color="gray" />
          <Text fontSize="xs" color="text" lineClamp={1}>
            {event.location}
          </Text>
        </HStack>
        <HStack gap={2}>
          <FaTicketAlt size={11} color="gray" />
          <Text fontSize="xs" color="text">
            {soldSeats} / {totalSeats} seats sold
          </Text>
        </HStack>
      </Stack>

      <Flex justify="space-between" align="center" gap={3}>
        <Link href={`/events/${event.id}`}>
          <Button size="xs" variant="outline" colorPalette="purple">
            Preview
          </Button>
        </Link>

        <NativeSelect.Root size="xs" maxW="140px">
          <NativeSelect.Field
            value={event.status}
            onChange={(e) => handleStatusChange(e.target.value)}
            // disabled={isPending}
            fontWeight="medium"
          >
            <option value="DRAFT">Draft</option>
            <option value="PUBLISHED">Published</option>
            <option value="CANCELLED">Cancelled</option>
          </NativeSelect.Field>
        </NativeSelect.Root>
      </Flex>
    </Box>
  );
}

export default function OrganizerEvents() {
  const { user } = useAuthStore();
  const { data, isPending, error } = useMyEvents();

  const events: Event[] = Array.isArray(data) ? data : (data?.data ?? []);

  const draft = events.filter((e) => e.status === "DRAFT");
  const published = events.filter((e) => e.status === "PUBLISHED");
  const cancelled = events.filter((e) => e.status === "CANCELLED");

  return (
    <Stack gap={8}>
      <Flex justify="space-between" align="center">
        <Box>
          <Heading
            fontSize={{ base: "2xl", md: "3xl" }}
            fontWeight="bold"
            mb={1}
          >
            My events
          </Heading>
          <Text color="text" fontSize="sm">
            {user?.role === "ADMIN"
              ? "All events on the platform"
              : "Manage your events and their status"}
          </Text>
        </Box>
        <Link href="/dashboard">
          <Button colorPalette="purple" size="sm" fontWeight="semibold">
            <FaPlus />
            New event
          </Button>
        </Link>
      </Flex>

      {isPending ? (
        <Grid templateColumns={{ base: "1fr", md: "repeat(2, 1fr)" }} gap={4}>
          {[1, 2, 3, 4].map((i) => (
            <Box
              key={i}
              h="180px"
              borderRadius="xl"
              bg="gray.100"
              _dark={{ bg: "gray.800" }}
            />
          ))}
        </Grid>
      ) : error ? (
        <Center py={10}>
          <Text color="danger">Unable to load your events.</Text>
        </Center>
      ) : events.length === 0 ? (
        <Center
          py={12}
          border="1px dashed"
          borderColor="border"
          borderRadius="xl"
          flexDirection="column"
          gap={3}
        >
          <Text color="text">{"You haven't created any events yet."}</Text>
          <Link href="/dashboard">
            <Button size="sm" colorPalette="purple" variant="outline">
              Create your first event
            </Button>
          </Link>
        </Center>
      ) : (
        <Stack gap={6}>
          {draft.length > 0 && (
            <Box>
              <Text
                fontSize="xs"
                fontWeight="semibold"
                color="text"
                textTransform="uppercase"
                letterSpacing="wide"
                mb={3}
              >
                Draft ({draft.length})
              </Text>
              <Grid
                templateColumns={{ base: "1fr", md: "repeat(2, 1fr)" }}
                gap={4}
              >
                {draft.map((e) => (
                  <EventManagementCard key={e.id} event={e} />
                ))}
              </Grid>
            </Box>
          )}

          {published.length > 0 && (
            <Box>
              <Text
                fontSize="xs"
                fontWeight="semibold"
                color="text"
                textTransform="uppercase"
                letterSpacing="wide"
                mb={3}
              >
                Published ({published.length})
              </Text>
              <Grid
                templateColumns={{ base: "1fr", md: "repeat(2, 1fr)" }}
                gap={4}
              >
                {published.map((e) => (
                  <EventManagementCard key={e.id} event={e} />
                ))}
              </Grid>
            </Box>
          )}

          {cancelled.length > 0 && (
            <Box>
              <Text
                fontSize="xs"
                fontWeight="semibold"
                color="text"
                textTransform="uppercase"
                letterSpacing="wide"
                mb={3}
              >
                Cancelled ({cancelled.length})
              </Text>
              <Grid
                templateColumns={{ base: "1fr", md: "repeat(2, 1fr)" }}
                gap={4}
              >
                {cancelled.map((e) => (
                  <EventManagementCard key={e.id} event={e} />
                ))}
              </Grid>
            </Box>
          )}
        </Stack>
      )}
    </Stack>
  );
}
