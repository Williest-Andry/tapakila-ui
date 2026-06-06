"use client";

import { useMyBookings } from "@/lib/api/queries/booking.queries";
import type { Booking } from "@/types/api.types";
import { Box, Button, Center, Heading, Stack, Text } from "@chakra-ui/react";
import Link from "next/link";
import BookingCard from "@/components/features/dashboard/booking-card";

export default function BookingsList() {
  const { data, isPending, error } = useMyBookings();

  const bookings: Booking[] = Array.isArray(data) ? data : (data?.data ?? []);

  const confirmed = bookings.filter((b) => b.status === "CONFIRMED");
  const cancelled = bookings.filter((b) => b.status === "CANCELLED");

  return (
    <Box>
      <Heading fontSize="xl" fontWeight="bold" mb={4}>
        My bookings
      </Heading>

      {isPending ? (
        <Stack gap={3}>
          {[1, 2, 3].map((i) => (
            <Box
              key={i}
              h="120px"
              borderRadius="xl"
              bg="gray.100"
              _dark={{ bg: "gray.800" }}
              animation="pulse 1.5s ease-in-out infinite"
            />
          ))}
        </Stack>
      ) : error ? (
        <Center py={10}>
          <Text color="danger">We were unable to load your booking.</Text>
        </Center>
      ) : bookings.length === 0 ? (
        <Center
          py={12}
          border="1px dashed"
          borderColor="border"
          borderRadius="xl"
          flexDirection="column"
          gap={3}
        >
          <Text color="text">{"You don't have a booking yet."}</Text>
          <Link href="/events">
            <Button size="sm" colorPalette="purple" variant="outline">
              Explore events
            </Button>
          </Link>
        </Center>
      ) : (
        <Stack gap={6}>
          {confirmed.length > 0 && (
            <Box>
              <Text
                fontSize="sm"
                fontWeight="semibold"
                color="text"
                mb={3}
                textTransform="uppercase"
                letterSpacing="wide"
              >
                Confirmed ({confirmed.length})
              </Text>
              <Stack gap={3}>
                {confirmed.map((booking) => (
                  <BookingCard key={booking.id} booking={booking} />
                ))}
              </Stack>
            </Box>
          )}

          {cancelled.length > 0 && (
            <Box>
              <Text
                fontSize="sm"
                fontWeight="semibold"
                color="text"
                mb={3}
                textTransform="uppercase"
                letterSpacing="wide"
              >
                Canceled ({cancelled.length})
              </Text>
              <Stack gap={3}>
                {cancelled.map((booking) => (
                  <BookingCard key={booking.id} booking={booking} />
                ))}
              </Stack>
            </Box>
          )}
        </Stack>
      )}
    </Box>
  );
}
