"use client";

import { toaster } from "@/components/ui/toaster";
import { getApiErrorMessage } from "@/lib/api/errors";
import { useBookings, useCancelBooking } from "@/lib/api/queries/bookings.queries";
import { formatDate } from "@/lib/format-date";
import { Booking } from "@/types/api.types";
import {
  Badge,
  Box,
  Button,
  Center,
  Heading,
  HStack,
  Icon,
  Link,
  Spinner,
  Stack,
  Text,
  VStack,
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import { FaArrowLeft } from "react-icons/fa";

function canCancelReservation(reservation: Booking) {
  return reservation.status === "CONFIRMED" && new Date(reservation.eventDate) > new Date();
}

export default function ReservationsPage() {
  const { data, isPending, error } = useBookings({ limit: 100, page: 1 });
  const cancelBooking = useCancelBooking();
  const reservations = [...(data?.data ?? [])].sort(
    (a, b) => new Date(b.eventDate).getTime() - new Date(a.eventDate).getTime(),
  );

  const cancelReservation = async (reservation: Booking) => {
    try {
      await cancelBooking.mutateAsync(reservation.id);
      toaster.success({
        title: "Reservation cancelled",
        description: "Your reservation has been successfully cancelled.",
      });
    } catch (cancelError) {
      toaster.error({
        title: "Error",
        description: getApiErrorMessage(
          cancelError,
          "An error occurred while cancelling the reservation.",
        ),
      });
    }
  };

  return (
    <>
      <Link href="/profile" mt={5} mb={5} display="inline-flex">
        <Button>
          <Icon>
            <FaArrowLeft />
          </Icon>
        </Button>
      </Link>
      <Box maxW="90dvw" mx="auto" mt={5} p={5} borderWidth="1px" borderRadius="md">
        <Heading as="h2" size="2xl" textAlign="center" mb={4}>
          My reservations
        </Heading>

        {isPending ? (
          <Center py={16} flexDirection="column" gap={4}>
            <Spinner size="xl" />
            <Text>Loading reservations...</Text>
          </Center>
        ) : error ? (
          <Center py={16}>
            <Text color="red.500">Unable to load reservations.</Text>
          </Center>
        ) : reservations.length === 0 ? (
          <Center py={16}>
            <Text color="gray.500">No reservations yet.</Text>
          </Center>
        ) : (
          <VStack gap={4}>
            {reservations.map((reservation) => {
              const cancellable = canCancelReservation(reservation);

              return (
                <motion.div
                  key={reservation.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  whileHover={{ scale: 1.02 }}
                  style={{ width: "100%" }}
                >
                  <Box
                    p={4}
                    borderWidth="1px"
                    borderRadius="lg"
                    shadow="md"
                    w="full"
                    bg="white"
                    _dark={{ bg: "gray.900" }}
                  >
                    <HStack justify="space-between" align="start" gap={6}>
                      <VStack align="start" gap={2}>
                        <HStack gap={3} wrap="wrap">
                          <Text fontSize="xl" fontWeight="bold">
                            {reservation.eventTitle}
                          </Text>
                          <Badge colorPalette={reservation.status === "CONFIRMED" ? "green" : "red"}>
                            {reservation.status}
                          </Badge>
                        </HStack>
                        <Text fontSize="sm" fontWeight="bold">
                          {formatDate(reservation.eventDate)}
                        </Text>
                        <Stack gap={1}>
                          {reservation.items.map((item) => (
                            <Text fontSize="sm" key={item.id}>
                              {item.ticketTypeName}: <strong>{item.quantity}</strong> × $ {item.unitPrice}
                            </Text>
                          ))}
                        </Stack>
                        <Text fontSize="sm">
                          Total: <strong>$ {reservation.totalPrice.toFixed(2)}</strong>
                        </Text>
                      </VStack>
                      <VStack>
                        <Button
                          size="lg"
                          colorPalette="red"
                          onClick={() => cancelReservation(reservation)}
                          disabled={!cancellable || cancelBooking.isPending}
                          loading={cancelBooking.isPending}
                        >
                          Cancel
                        </Button>
                        {!cancellable && reservation.status === "CONFIRMED" && (
                          <Text color="gray.500" fontSize="xs" textAlign="center">
                            Past events cannot be cancelled.
                          </Text>
                        )}
                      </VStack>
                    </HStack>
                  </Box>
                </motion.div>
              );
            })}
          </VStack>
        )}
      </Box>
    </>
  );
}
