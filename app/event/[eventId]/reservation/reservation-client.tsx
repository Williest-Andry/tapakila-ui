"use client";

import { toaster } from "@/components/ui/toaster";
import { getApiErrorMessage } from "@/lib/api/errors";
import { useCreateBooking } from "@/lib/api/queries/bookings.queries";
import { useEvent, useTicketTypes } from "@/lib/api/queries/events.queries";
import { formatDate } from "@/lib/format-date";
import { createBookingSchema } from "@/schema/booking.schema";
import { useAuthStore } from "@/store/auth.store";
import type { Booking, TicketType } from "@/types/api.types";
import {
  Badge,
  Box,
  Button,
  Center,
  Container,
  Flex,
  Heading,
  HStack,
  Icon,
  IconButton,
  Link,
  NumberInput,
  Separator,
  Spinner,
  Stack,
  Text,
  VStack,
} from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { ImTicket } from "react-icons/im";
import { LuMinus, LuPlus } from "react-icons/lu";

type QuantityState = Record<string, number>;

function getMaxQuantity(ticket: TicketType) {
  if (!ticket.isActive || ticket.availableSeats <= 0) return 0;
  return Math.min(ticket.availableSeats, ticket.maxPerUser);
}

export default function ReservationClient({ eventId }: { eventId: string }) {
  const router = useRouter();
  const { isAuthenticated } = useAuthStore();
  const authenticated = isAuthenticated();
  const { data: event, isPending: isEventPending, error: eventError } = useEvent(eventId);
  const {
    data: tickets = [],
    isPending: areTicketsPending,
    error: ticketsError,
  } = useTicketTypes(eventId);
  const createBooking = useCreateBooking();

  const [quantities, setQuantities] = useState<QuantityState>({});
  const [isReviewing, setIsReviewing] = useState(false);
  const [createdBooking, setCreatedBooking] = useState<Booking | null>(null);

  const selectedTickets = useMemo(
    () =>
      tickets
        .map((ticket) => ({ ticket, quantity: quantities[ticket.id] ?? 0 }))
        .filter(({ quantity }) => quantity > 0),
    [quantities, tickets],
  );

  const totalPrice = selectedTickets.reduce(
    (total, { ticket, quantity }) => total + Number(ticket.price) * quantity,
    0,
  );
  const totalQuantity = selectedTickets.reduce(
    (total, { quantity }) => total + quantity,
    0,
  );

  const updateQuantity = (ticket: TicketType, nextValue: string) => {
    const nextQuantity = Number(nextValue || 0);
    const max = getMaxQuantity(ticket);
    setCreatedBooking(null);
    setIsReviewing(false);
    setQuantities((prev) => ({
      ...prev,
      [ticket.id]: Math.max(0, Math.min(max, Number.isNaN(nextQuantity) ? 0 : nextQuantity)),
    }));
  };

  const handleReview = () => {
    if (!authenticated) {
      router.push(`/login?redirect=/event/${eventId}/reservation`);
      return;
    }

    if (selectedTickets.length === 0) {
      toaster.error({
        title: "No tickets selected",
        description: "Please select at least one ticket before continuing.",
      });
      return;
    }

    setIsReviewing(true);
  };

  const submitReservation = async () => {
    const body = {
      eventId,
      items: selectedTickets.map(({ ticket, quantity }) => ({
        ticketTypeId: ticket.id,
        quantity,
      })),
    };

    const parsedBody = createBookingSchema.safeParse(body);
    if (!parsedBody.success) {
      toaster.error({
        title: "Invalid booking",
        description: parsedBody.error.errors[0]?.message ?? "Please check your selection.",
      });
      return;
    }

    try {
      const booking = await createBooking.mutateAsync(parsedBody.data);
      setCreatedBooking(booking);
      setIsReviewing(false);
      setQuantities({});
      toaster.success({
        title: "Booking confirmed",
        description: `Your booking for ${booking.eventTitle} has been confirmed.`,
      });
    } catch (error) {
      toaster.error({
        title: "Booking failed",
        description: getApiErrorMessage(
          error,
          "The booking could not be completed. Please try again.",
        ),
      });
    }
  };

  if (isEventPending || areTicketsPending) {
    return (
      <Center minH="70vh" flexDirection="column" gap={4}>
        <Spinner size="xl" />
        <Heading size="lg">Loading booking details...</Heading>
      </Center>
    );
  }

  if (eventError || ticketsError || !event) {
    return (
      <Center minH="70vh" flexDirection="column" gap={4} px={4}>
        <Heading size="lg" color="red.500">
          Booking details could not be loaded.
        </Heading>
        <Text color="gray.500">Please refresh the page or come back later.</Text>
        <Button onClick={() => router.push(`/event/${eventId}`)}>Back to event</Button>
      </Center>
    );
  }

  return (
    <Container maxW="5xl" py={8}>
      <Link href={`/event/${eventId}`} display="inline-flex" mb={6}>
        <Button>
          <Icon>
            <FaArrowLeft />
          </Icon>
        </Button>
      </Link>

      <Stack gap={8}>
        <Box>
          <Heading as="h1" size="2xl" mb={2}>
            Book tickets
          </Heading>
          <Text color="gray.500">
            {event.title} · {formatDate(event.eventDate)} · {event.location}
          </Text>
        </Box>

        {!authenticated && (
          <Box p={4} borderWidth="1px" borderColor="orange.300" borderRadius="xl" bg="orange.50">
            <Text color="orange.800" fontWeight="semibold">
              You need to sign in before confirming a booking.
            </Text>
          </Box>
        )}

        <VStack align="stretch" gap={4}>
          {tickets.map((ticket) => {
            const maxQuantity = getMaxQuantity(ticket);
            const quantity = quantities[ticket.id] ?? 0;
            const disabled = maxQuantity === 0;

            return (
              <Box key={ticket.id} p={5} borderWidth="1px" borderRadius="xl" bg="white" _dark={{ bg: "gray.900" }}>
                <Flex justify="space-between" align={{ base: "stretch", md: "center" }} gap={5} direction={{ base: "column", md: "row" }}>
                  <HStack gap={4} align="start">
                    <Icon fontSize="2xl" mt={1}>
                      <ImTicket />
                    </Icon>
                    <Box>
                      <HStack gap={3} wrap="wrap">
                        <Heading size="md">{ticket.name}</Heading>
                        <Badge colorPalette={disabled ? "red" : "green"}>
                          {disabled ? "Unavailable" : `${ticket.availableSeats} left`}
                        </Badge>
                      </HStack>
                      <Text color="gray.500" mt={1}>
                        $ {ticket.price} · max {ticket.maxPerUser} per booking
                      </Text>
                    </Box>
                  </HStack>

                  <NumberInput.Root
                    value={String(quantity)}
                    spinOnPress={false}
                    min={0}
                    max={maxQuantity}
                    disabled={disabled}
                    onValueChange={(value) => updateQuantity(ticket, value.value)}
                  >
                    <HStack gap="2" justify="flex-end">
                      <NumberInput.DecrementTrigger asChild>
                        <IconButton variant="outline" size="sm" aria-label={`Remove ${ticket.name}`}>
                          <LuMinus />
                        </IconButton>
                      </NumberInput.DecrementTrigger>
                      <NumberInput.ValueText textAlign="center" fontSize="lg" minW="4ch" />
                      <NumberInput.IncrementTrigger asChild>
                        <IconButton variant="outline" size="sm" aria-label={`Add ${ticket.name}`}>
                          <LuPlus />
                        </IconButton>
                      </NumberInput.IncrementTrigger>
                    </HStack>
                  </NumberInput.Root>
                </Flex>
              </Box>
            );
          })}
        </VStack>

        <Box p={5} borderWidth="1px" borderRadius="xl" bg="gray.50" _dark={{ bg: "gray.950" }}>
          <Flex justify="space-between" align="center" gap={4} wrap="wrap">
            <Box>
              <Text color="gray.500">Total</Text>
              <Heading size="lg">$ {totalPrice.toFixed(2)}</Heading>
              <Text color="gray.500" fontSize="sm">
                {totalQuantity} ticket{totalQuantity > 1 ? "s" : ""} selected
              </Text>
            </Box>
            <Button
              colorPalette="purple"
              size="lg"
              onClick={handleReview}
              disabled={totalQuantity === 0 || createBooking.isPending}
            >
              Review booking
            </Button>
          </Flex>
        </Box>

        {isReviewing && (
          <Box p={5} borderWidth="1px" borderRadius="xl" shadow="sm">
            <Heading size="lg" mb={4}>
              Confirm your order
            </Heading>
            <Stack gap={3}>
              {selectedTickets.map(({ ticket, quantity }) => (
                <Flex key={ticket.id} justify="space-between" gap={4}>
                  <Text>
                    {quantity} × {ticket.name}
                  </Text>
                  <Text fontWeight="semibold">$ {(Number(ticket.price) * quantity).toFixed(2)}</Text>
                </Flex>
              ))}
            </Stack>
            <Separator my={4} />
            <Flex justify="space-between" mb={5}>
              <Text fontWeight="bold">Total</Text>
              <Text fontWeight="bold">$ {totalPrice.toFixed(2)}</Text>
            </Flex>
            <HStack gap={3} justify="flex-end" wrap="wrap">
              <Button variant="outline" onClick={() => setIsReviewing(false)}>
                Edit selection
              </Button>
              <Button colorPalette="green" loading={createBooking.isPending} onClick={submitReservation}>
                Confirm booking
              </Button>
            </HStack>
          </Box>
        )}

        {createdBooking && (
          <Box p={5} borderWidth="1px" borderRadius="xl" borderColor="green.400" bg="green.50" _dark={{ bg: "green.950" }}>
            <Heading size="lg" color="green.700" mb={2}>
              Booking confirmed
            </Heading>
            <Text color="green.800" _dark={{ color: "green.100" }}>
              Booking #{createdBooking.id} for {createdBooking.eventTitle} is confirmed.
            </Text>
            <Text color="green.800" _dark={{ color: "green.100" }} mt={1}>
              Total paid: $ {createdBooking.totalPrice.toFixed(2)}
            </Text>
            <Button mt={4} colorPalette="green" onClick={() => router.push("/profile/reservations")}>
              View my bookings
            </Button>
          </Box>
        )}
      </Stack>
    </Container>
  );
}
