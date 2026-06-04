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
import { FaArrowLeft, FaCalendarAlt, FaMapMarkerAlt, FaTicketAlt, FaUserTie } from "react-icons/fa";
import { z } from "zod";
import { toaster } from "@/components/ui/toaster";
import { useMe } from "@/lib/api/queries/auth.queries";
import {
  useCreateBooking,
  useEvent,
  useTicketTypes,
} from "@/lib/api/queries/events.queries";
import { formatDate } from "@/lib/format-date";
import { useAuthStore } from "@/store/auth.store";
import type { TicketType } from "@/types/api.types";

const bookingSchema = z
  .record(z.string(), z.coerce.number().int().min(0))
  .refine((selection) => Object.values(selection).some((quantity) => quantity > 0), {
    message: "Sélectionnez au moins un billet.",
  });

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
  if (!ticket.isActive) return "Vente fermée";
  if (ticket.availableSeats === 0) return "Épuisé";
  if (ticket.availableSeats <= 10) return `Plus que ${ticket.availableSeats}`;
  return `${ticket.availableSeats} disponible${ticket.availableSeats > 1 ? "s" : ""}`;
}

function getAvailabilityPalette(ticket: TicketType) {
  if (!ticket.isActive || ticket.availableSeats === 0) return "red";
  if (ticket.availableSeats <= 10) return "orange";
  return "green";
}

export default function EventDetailsPage({ eventId }: EventDetailsPageProps) {
  const router = useRouter();
  const { isAuthenticated, user } = useAuthStore();
  const authenticated = isAuthenticated();
  const { data: me } = useMe();
  const currentUser = me ?? user;

  const [selection, setSelection] = useState<TicketSelection>({});
  const [validationError, setValidationError] = useState<string | null>(null);
  const [createdBookingId, setCreatedBookingId] = useState<string | null>(null);

  const { data: event, error: eventError, isPending: isEventPending } =
    useEvent(eventId);
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

  const isUserAllowedToBook = authenticated && currentUser?.role === "USER";

  const handleQuantityChange = (ticket: TicketType, value: string) => {
    const numericValue = value === "" ? 0 : Number(value);
    const boundedValue = Number.isNaN(numericValue)
      ? 0
      : Math.min(Math.max(0, numericValue), ticket.maxPerUser, ticket.availableSeats);

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
      setValidationError(parsed.error.issues[0]?.message ?? "Sélection invalide.");
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
        title: "Réservation confirmée",
        description: "Vos billets ont bien été réservés.",
      });
    } catch (error) {
      const message =
        error && typeof error === "object" && "message" in error
          ? String(error.message)
          : "Impossible de créer la réservation.";
      toaster.error({ title: "Erreur de réservation", description: message });
    }
  };

  if (isEventPending) {
    return (
      <Center minH="60vh">
        <VStack gap={3}>
          <Spinner size="xl" color="primary" />
          <Text color="text">Chargement de l&apos;événement...</Text>
        </VStack>
      </Center>
    );
  }

  if (eventError || !event) {
    return (
      <Container maxW="4xl" py={16}>
        <VStack gap={5} textAlign="center">
          <Heading size="xl">Événement introuvable</Heading>
          <Text color="text">
            L&apos;événement demandé n&apos;existe pas ou n&apos;est plus publié.
          </Text>
          <Button asChild colorPalette="purple">
            <Link href="/events">Retour aux événements</Link>
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
          Tous les événements
        </Link>
      </Button>

      <Grid templateColumns={{ base: "1fr", lg: "minmax(0, 1.35fr) 0.65fr" }} gap={8}>
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
                <Text color="gray.500">Image de {event.title}</Text>
              </Center>
            )}
            <Box position="absolute" inset={0} bg="linear-gradient(180deg, rgba(0,0,0,0.05), rgba(0,0,0,0.62))" />
            <Stack position="absolute" left={{ base: 5, md: 8 }} right={{ base: 5, md: 8 }} bottom={{ base: 5, md: 8 }} gap={4} color="white">
              <HStack gap={3} wrap="wrap">
                <Badge colorPalette="purple" borderRadius="full" px={3} py={1}>
                  {event.category.name}
                </Badge>
                <Badge colorPalette={event.status === "PUBLISHED" ? "green" : "gray"} borderRadius="full" px={3} py={1}>
                  {event.status}
                </Badge>
              </HStack>
              <Heading size={{ base: "2xl", md: "4xl" }} lineHeight="1.05">
                {event.title}
              </Heading>
            </Stack>
          </Box>

          <Grid templateColumns={{ base: "1fr", md: "repeat(3, 1fr)" }} gap={4}>
            <InfoCard icon={FaCalendarAlt} label="Date" value={dateTimeFormatter.format(eventDate)} />
            <InfoCard icon={FaMapMarkerAlt} label="Lieu" value={event.location} />
            <InfoCard icon={FaUserTie} label="Organisateur" value={organizerName} />
          </Grid>

          <Box border="1px solid" borderColor="border" borderRadius="2xl" p={{ base: 5, md: 7 }} bg="white" _dark={{ bg: "gray.900", borderColor: "gray.800" }}>
            <Heading size="lg" mb={4}>À propos de l&apos;événement</Heading>
            <Text color="text" whiteSpace="pre-line" lineHeight="1.8">
              {event.description ?? "Aucune description n&apos;a encore été ajoutée pour cet événement."}
            </Text>
          </Box>
        </Stack>

        <Box alignSelf="start" position={{ lg: "sticky" }} top={{ lg: 24 }}>
          <Box border="1px solid" borderColor="border" borderRadius="2xl" p={{ base: 5, md: 6 }} bg="white" _dark={{ bg: "gray.900", borderColor: "gray.800" }} shadow="sm">
            <HStack justify="space-between" align="start" mb={5}>
              <Box>
                <Heading size="lg">Billets</Heading>
                <Text color="text" fontSize="sm">Choisissez le type et la quantité.</Text>
              </Box>
              <Icon as={FaTicketAlt} color="primary" boxSize={6} />
            </HStack>

            {areTicketsPending ? (
              <Center py={10}><Spinner color="primary" /></Center>
            ) : ticketTypesError ? (
              <Text color="red.500">Impossible de charger les billets.</Text>
            ) : ticketTypes.length === 0 ? (
              <Text color="text">Aucun billet n&apos;est disponible pour le moment.</Text>
            ) : (
              <Stack gap={4}>
                {ticketTypes.map((ticket) => {
                  const isTicketBookable = ticket.isActive && ticket.availableSeats > 0;
                  return (
                    <Box key={ticket.id} border="1px solid" borderColor="border" borderRadius="xl" p={4} _dark={{ borderColor: "gray.800" }}>
                      <Flex justify="space-between" gap={4} align="start">
                        <Box flex="1">
                          <HStack gap={2} mb={1} wrap="wrap">
                            <Text fontWeight="bold">{ticket.name}</Text>
                            <Badge colorPalette={getAvailabilityPalette(ticket)}>{getAvailabilityLabel(ticket)}</Badge>
                          </HStack>
                          <Text color="primary" fontWeight="semibold">{currencyFormatter.format(ticket.price)}</Text>
                          <Text color="text" fontSize="sm" mt={1}>
                            Limite: {ticket.maxPerUser} par utilisateur · {ticket.totalSeats} places au total
                          </Text>
                        </Box>
                        <Input
                          type="number"
                          min={0}
                          max={Math.min(ticket.maxPerUser, ticket.availableSeats)}
                          width="88px"
                          textAlign="center"
                          value={selection[ticket.id] ?? 0}
                          onChange={(event) => handleQuantityChange(ticket, event.target.value)}
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
              <HStack justify="space-between"><Text color="text">Billets sélectionnés</Text><Text fontWeight="semibold">{totalTickets}</Text></HStack>
              <HStack justify="space-between"><Text color="text">Total</Text><Text fontWeight="bold" fontSize="xl">{currencyFormatter.format(totalPrice)}</Text></HStack>
            </Stack>

            {validationError && <Text color="red.500" fontSize="sm" mt={4}>{validationError}</Text>}
            {!authenticated && <Text color="text" fontSize="sm" mt={4}>Connectez-vous pour réserver vos billets.</Text>}
            {authenticated && currentUser?.role && currentUser.role !== "USER" && (
              <Text color="orange.500" fontSize="sm" mt={4}>Seuls les comptes utilisateur peuvent réserver depuis cette page.</Text>
            )}
            {createdBookingId && (
              <Box mt={4} p={4} borderRadius="xl" bg="green.50" color="green.800" _dark={{ bg: "green.900", color: "green.100" }}>
                <Text fontWeight="semibold">Réservation confirmée</Text>
                <Text fontSize="sm">Référence: {createdBookingId}</Text>
              </Box>
            )}

            <Button
              mt={5}
              width="full"
              colorPalette="purple"
              size="lg"
              onClick={handleBooking}
              disabled={ticketTypes.length === 0 || createBooking.isPending || (!authenticated ? false : !isUserAllowedToBook)}
              loading={createBooking.isPending}
            >
              {authenticated ? "Confirmer la réservation" : "Se connecter pour réserver"}
            </Button>

            <Text color="text" fontSize="xs" mt={3} textAlign="center">
              Disponibilité mise à jour après confirmation. Dernière date connue: {formatDate(event.eventDate)}.
            </Text>
          </Box>
        </Box>
      </Grid>
    </Container>
  );
}

function InfoCard({
  icon,
  label,
  value,
}: {
  icon: typeof FaCalendarAlt;
  label: string;
  value: string;
}) {
  return (
    <HStack border="1px solid" borderColor="border" borderRadius="xl" p={4} bg="white" _dark={{ bg: "gray.900", borderColor: "gray.800" }} align="start" gap={3}>
      <Center bg="brand.50" color="primary" borderRadius="full" boxSize={10} flexShrink={0} _dark={{ bg: "gray.800" }}>
        <Icon as={icon} />
      </Center>
      <Box>
        <Text color="text" fontSize="xs" textTransform="uppercase" letterSpacing="wide">{label}</Text>
        <Text fontWeight="semibold">{value}</Text>
      </Box>
    </HStack>
  );
}
