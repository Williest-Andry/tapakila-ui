"use client";

import { useMemo, useState } from "react";
import {
  Badge,
  Box,
  Button,
  Center,
  Container,
  Flex,
  Grid,
  Heading,
  HStack,
  Icon,
  Input,
  Separator,
  Spinner,
  Stack,
  Text,
  VStack,
} from "@chakra-ui/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  FaArrowLeft,
  FaCalendarAlt,
  FaMapMarkerAlt,
  FaTicketAlt,
  FaUserTie,
} from "react-icons/fa";
import { bookingSchema } from "@/schema/booking.schema";
import { toaster } from "@/components/ui/toaster";
import { useMe } from "@/lib/api/queries/auth.queries";
import { useEvent, useTicketTypes } from "@/lib/api/queries/events.queries";
import { useCreateBooking } from "@/lib/api/queries/booking.queries";
import { formatDate } from "@/lib/format-date";
import { useAuthStore } from "@/store/auth.store";
import type { TicketType } from "@/types/api.types";
import InfoCard from "@/components/ui/info-card";

const currencyFormatter = new Intl.NumberFormat("fr-MG", {
  style: "currency",
  currency: "MGA",
  maximumFractionDigits: 0,
});

const dateTimeFormatter = new Intl.DateTimeFormat("fr-FR", {
  weekday: "long",
  day: "numeric",
  month: "long",
  year: "numeric",
  hour: "2-digit",
  minute: "2-digit",
});

type TicketSelection = Record<string, number>;

interface EventDetailsPageProps {
  eventId: string;
}

function getAvailabilityLabel(ticket: TicketType) {
  if (!ticket.isActive) return "Sale closed";
  if (ticket.availableSeats === 0) return "Sold out";
  return `Available : ${ticket.availableSeats}`;
}

function getAvailabilityPalette(ticket: TicketType) {
  if (!ticket.isActive || ticket.availableSeats === 0) return "red";
  if (ticket.availableSeats <= 10) return "orange";
  return "green";
}

export default function EventDetailsPage({ eventId }: EventDetailsPageProps) {
  const router = useRouter();
  const { isAuthenticated, user } = useAuthStore();
  const { data: me } = useMe();
  const currentUser = me ?? user;

  const [selection, setSelection] = useState<TicketSelection>({});
  const [validationError, setValidationError] = useState<string | null>(null);
  const [createdBookingId, setCreatedBookingId] = useState<string | null>(null);

  const {
    data: event,
    error: eventError,
    isPending: isEventPending,
  } = useEvent(eventId);

  const {
    data: ticketTypesData,
    error: ticketTypesError,
    isPending: areTicketsPending,
  } = useTicketTypes(eventId);

  const createBooking = useCreateBooking(eventId);

  const ticketTypes = useMemo<TicketType[]>(
    () => (ticketTypesData ?? event?.ticketTypes ?? []) as TicketType[],
    [event?.ticketTypes, ticketTypesData],
  );

  const orderItems = useMemo(
    () =>
      ticketTypes
        .map((ticket) => ({ ticket, quantity: selection[ticket.id] ?? 0 }))
        .filter((item) => item.quantity > 0),
    [selection, ticketTypes],
  );

  const totalTickets = orderItems.reduce(
    (total: number, item) => total + item.quantity,
    0,
  );
  const totalPrice = orderItems.reduce(
    (total: number, item) => total + item.quantity * item.ticket.price,
    0,
  );

  const isUserAllowedToBook =
    isAuthenticated() && currentUser?.role !== "ADMIN";

  const handleQuantityChange = (ticket: TicketType, value: string) => {
    const numericValue = value === "" ? 0 : Number(value);
    const boundedValue = Number.isNaN(numericValue)
      ? 0
      : Math.min(
          Math.max(0, numericValue),
          ticket.maxPerUser,
          ticket.availableSeats,
        );

    setValidationError(null);
    setCreatedBookingId(null);
    setSelection((previous) => ({ ...previous, [ticket.id]: boundedValue }));
  };

  const handleBooking = async () => {
    if (!isUserAllowedToBook) {
      router.push("/login");
      return;
    }

    const parsed = bookingSchema.safeParse(selection);
    if (!parsed.success) {
      setValidationError(
        parsed.error.issues[0]?.message ?? "Invalid selection",
      );
      return;
    }

    const items = Object.entries(parsed.data)
      .filter(([, quantity]) => quantity > 0)
      .map(([ticketTypeId, quantity]) => ({ ticketTypeId, quantity }));

    try {
      const booking = await createBooking.mutateAsync({ eventId, items });
      setCreatedBookingId(booking.id);
      setSelection({});
      toaster.success({
        title: "Booking confirmed",
        description: "Your tickets have been successfully booked.",
      });
    } catch (error) {
      const message =
        error && typeof error === "object" && "message" in error
          ? String(error.message)
          : "Unable to create the booking";
      toaster.error({ title: "Booking error", description: message });
    }
  };

  if (isEventPending) {
    return (
      <Center minH="60vh">
        <VStack gap={3}>
          <Spinner size="xl" color="primary" />
          <Text color="text">Loading the event...</Text>
        </VStack>
      </Center>
    );
  }

  if (eventError || !event) {
    return (
      <Container maxW="4xl" py={16}>
        <VStack gap={5} textAlign="center">
          <Heading size="xl">Event not found</Heading>
          <Text color="text">
            The requested event does not exist or is no longer published.
          </Text>
          <Button asChild colorPalette="purple">
            <Link href="/events">Back to Events</Link>
          </Button>
        </VStack>
      </Container>
    );
  }

  const eventDate = new Date(event.eventDate);
  const organizerName = `${event.organizer.firstName} ${event.organizer.lastName}`;

  return (
    <Container maxW="7xl" py={{ base: 6, md: 10 }}>
      <Button asChild variant="ghost" colorPalette="gray" mb={6}>
        <Link href="/events">
          <Icon as={FaArrowLeft} />
          All events
        </Link>
      </Button>

      <Grid
        templateColumns={{ base: "1fr", lg: "minmax(0, 1.35fr) 0.65fr" }}
        gap={8}
      >
        <Stack gap={6}>
          <Box
            position="relative"
            minH={{ base: "280px", md: "440px" }}
            borderRadius="2xl"
            overflow="hidden"
            bg="gray.100"
          >
            {event.imageUrl ? (
              <Image
                src={event.imageUrl}
                alt={event.title}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 820px"
                style={{ objectFit: "cover" }}
              />
            ) : (
              <Center h="100%" minH={{ base: "280px", md: "440px" }}>
                <Text color="gray.500">Image of {event.title}</Text>
              </Center>
            )}
            <Box
              position="absolute"
              inset={0}
              bg="linear-gradient(180deg, rgba(0,0,0,0.05), rgba(0,0,0,0.62))"
            />
            <Stack
              position="absolute"
              left={{ base: 5, md: 8 }}
              right={{ base: 5, md: 8 }}
              bottom={{ base: 5, md: 8 }}
              gap={4}
              color="white"
            >
              <HStack gap={3} wrap="wrap">
                <Badge colorPalette="purple" borderRadius="full" px={3} py={1}>
                  {event.category.name}
                </Badge>
                <Badge
                  colorPalette={event.status === "PUBLISHED" ? "green" : "gray"}
                  borderRadius="full"
                  px={3}
                  py={1}
                >
                  {event.status}
                </Badge>
              </HStack>
              <Heading size={{ base: "2xl", md: "4xl" }} lineHeight="1.05">
                {event.title}
              </Heading>
            </Stack>
          </Box>

          <Grid templateColumns={{ base: "1fr", md: "repeat(3, 1fr)" }} gap={4}>
            <InfoCard
              icon={FaCalendarAlt}
              label="Date"
              value={dateTimeFormatter.format(eventDate)}
            />
            <InfoCard
              icon={FaMapMarkerAlt}
              label="Lieu"
              value={event.location}
            />
            <InfoCard
              icon={FaUserTie}
              label="Organisateur"
              value={organizerName}
            />
          </Grid>

          <Box
            border="1px solid"
            borderColor="border"
            borderRadius="2xl"
            p={{ base: 5, md: 7 }}
            bg="white"
            _dark={{ bg: "gray.900", borderColor: "gray.800" }}
          >
            <Heading size="lg" mb={4}>
              About the event
            </Heading>
            <Text color="text" whiteSpace="pre-line" lineHeight="1.8">
              {event.description ??
                "No description has been added for this event yet"}
            </Text>
          </Box>
        </Stack>

        <Box alignSelf="start" position={{ lg: "sticky" }} top={{ lg: 24 }}>
          <Box
            border="1px solid"
            borderColor="border"
            borderRadius="2xl"
            p={{ base: 5, md: 6 }}
            bg="white"
            _dark={{ bg: "gray.900", borderColor: "gray.800" }}
            shadow="sm"
          >
            <HStack justify="space-between" align="start" mb={5}>
              <Box>
                <Heading size="lg">Billets</Heading>
                <Text color="text" fontSize="sm">
                  Select the type and quantity
                </Text>
              </Box>
              <Icon as={FaTicketAlt} color="primary" boxSize={6} />
            </HStack>

            {areTicketsPending ? (
              <Center py={10}>
                <Spinner color="primary" />
              </Center>
            ) : ticketTypesError ? (
              <Text color="red.500">Unable to load the tickets</Text>
            ) : ticketTypes.length === 0 ? (
              <Text color="text">No tickets are available at this time</Text>
            ) : (
              <Stack gap={4}>
                {ticketTypes.map((ticket) => {
                  const isTicketBookable =
                    ticket.isActive && ticket.availableSeats > 0;
                  return (
                    <Box
                      key={ticket.id}
                      border="1px solid"
                      borderColor="border"
                      borderRadius="xl"
                      p={4}
                      _dark={{ borderColor: "gray.800" }}
                    >
                      <Flex justify="space-between" gap={4} align="start">
                        <Box flex="1">
                          <HStack gap={2} mb={1} wrap="wrap">
                            <Text fontWeight="bold">{ticket.name}</Text>
                            <Badge
                              colorPalette={getAvailabilityPalette(ticket)}
                            >
                              {getAvailabilityLabel(ticket)}
                            </Badge>
                          </HStack>
                          <Text color="primary" fontWeight="semibold">
                            {currencyFormatter.format(ticket.price)}
                          </Text>
                          <Text color="text" fontSize="sm" mt={1}>
                            {ticket.maxPerUser} allowed per user · total seats :{" "}
                            {ticket.totalSeats}
                          </Text>
                        </Box>
                        <Input
                          type="number"
                          min={0}
                          max={Math.min(
                            ticket.maxPerUser,
                            ticket.availableSeats,
                          )}
                          width="88px"
                          textAlign="center"
                          value={selection[ticket.id] ?? 0}
                          onChange={(event) =>
                            handleQuantityChange(ticket, event.target.value)
                          }
                          disabled={!isTicketBookable || !isUserAllowedToBook}
                        />
                      </Flex>
                    </Box>
                  );
                })}
              </Stack>
            )}

            <Separator my={5} />

            <Stack gap={3}>
              <HStack justify="space-between">
                <Text color="text">Selected tickets</Text>
                <Text fontWeight="semibold">{totalTickets}</Text>
              </HStack>
              <HStack justify="space-between">
                <Text color="text">Total</Text>
                <Text fontWeight="bold" fontSize="xl">
                  {currencyFormatter.format(totalPrice)}
                </Text>
              </HStack>
            </Stack>

            {validationError && (
              <Text color="red.500" fontSize="sm" mt={4}>
                {validationError}
              </Text>
            )}
            {!isAuthenticated() && (
              <Text color="text" fontSize="sm" mt={4}>
                Sign in to book your tickets
              </Text>
            )}
            {isAuthenticated() &&
              currentUser?.role &&
              currentUser.role === "ADMIN" && (
                <Text color="orange.500" fontSize="sm" mt={4}>
                  Only user and organizer accounts can make bookings from this
                  page
                </Text>
              )}
            {createdBookingId && (
              <Box
                mt={4}
                p={4}
                borderRadius="xl"
                bg="green.50"
                color="green.800"
                _dark={{ bg: "green.900", color: "green.100" }}
              >
                <Text fontWeight="semibold">Booking confirmed</Text>
                <Text fontSize="sm">Reference : {createdBookingId}</Text>
              </Box>
            )}

            <Button
              mt={5}
              width="full"
              colorPalette="purple"
              size="lg"
              onClick={handleBooking}
              disabled={
                ticketTypes.length === 0 ||
                createBooking.isPending ||
                !isUserAllowedToBook
              }
              loading={createBooking.isPending}
            >
              {isAuthenticated() ? "Confirm booking" : "Sign in to book"}
            </Button>

            <Text color="text" fontSize="xs" mt={3} textAlign="center">
              Availability updated after confirmation. Last known date :{" "}
              {formatDate(event.eventDate)}.
            </Text>
          </Box>
        </Box>
      </Grid>
    </Container>
  );
}
