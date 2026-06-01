"use client";

import type { TicketType } from "@/types/api.types";
import { useAuthStore } from "@/store/auth.store";
import { Button, Flex, Text } from "@chakra-ui/react";
import { useRouter } from "next/navigation";

export default function ReservationButton({
  eventId,
  tickets,
}: {
  eventId: string;
  tickets: TicketType[];
}) {
  const router = useRouter();
  const { isAuthenticated } = useAuthStore();
  const authenticated = isAuthenticated();
  const hasAvailableTickets = tickets.some(
    (ticket) => ticket.isActive && ticket.availableSeats > 0,
  );

  const redirection = () => {
    if (authenticated) {
      router.push(`/event/${eventId}/reservation`);
      return;
    }

    router.push(`/login?redirect=/event/${eventId}/reservation`);
  };

  return (
    <Flex direction="column" align="center" gap={3}>
      <Button
        colorPalette="blue"
        variant="outline"
        size="lg"
        minW={{ base: "220px", md: "10vw" }}
        onClick={redirection}
        disabled={!hasAvailableTickets}
      >
        {authenticated ? "Book" : "Sign in to book"}
      </Button>
      {!hasAvailableTickets && (
        <Text color="red.500" fontWeight="semibold">
          No tickets are currently available for this event.
        </Text>
      )}
      {!authenticated && hasAvailableTickets && (
        <Text color="red.500" fontWeight="semibold">
          You must sign in before booking.
        </Text>
      )}
    </Flex>
  );
}
