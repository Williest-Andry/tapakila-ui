import { toaster } from "@/components/ui/toaster";
import { useCancelBooking } from "@/lib/api/queries/booking.queries";
import { Booking } from "@/types/api.types";
import {
  Badge,
  Box,
  Button,
  Flex,
  HStack,
  Separator,
  Stack,
  Text,
  VStack,
} from "@chakra-ui/react";
import Link from "next/link";
import { FaCalendarAlt, FaTicketAlt } from "react-icons/fa";

const currencyFormatter = new Intl.NumberFormat("fr-MG", {
  style: "currency",
  currency: "MGA",
  maximumFractionDigits: 0,
});

const dateFormatter = new Intl.DateTimeFormat("fr-FR", {
  day: "numeric",
  month: "long",
  year: "numeric",
});

export default function BookingCard({ booking }: { booking: Booking }) {
  const { mutate: cancel, isPending } = useCancelBooking();
  const isConfirmed = booking.status === "CONFIRMED";

  const handleCancel = () => {
    cancel(booking.id, {
      onSuccess: () =>
        toaster.success({
          title: "Booking cancelled",
          description: "Your booking has been cancelled.",
        }),
      onError: () =>
        toaster.error({
          title: "Error",
          description: "This booking cannot be canceled.",
        }),
    });
  };

  return (
    <Box
      border="1px solid"
      borderColor={isConfirmed ? "border" : "gray.200"}
      borderRadius="xl"
      p={{ base: 4, md: 5 }}
      bg="white"
      _dark={{ bg: "gray.900", borderColor: "gray.800" }}
      opacity={isConfirmed ? 1 : 0.7}
      transition="opacity 0.2s"
    >
      <Flex justify="space-between" align="flex-start" mb={3} gap={3}>
        <Box>
          <Text fontWeight="bold" fontSize="md" lineClamp={1}>
            {booking.eventTitle}
          </Text>
          <HStack gap={2} mt={1}>
            <FaCalendarAlt size={11} color="gray" />
            <Text fontSize="xs" color="text">
              {dateFormatter.format(new Date(booking.eventDate))}
            </Text>
          </HStack>
        </Box>
        <VStack align={"end"}>
          <Text fontSize="xs" color="text">
            Reference : {booking.id}
          </Text>
          <Badge
            colorPalette={isConfirmed ? "green" : "red"}
            variant="subtle"
            flexShrink={0}
          >
            {isConfirmed ? "Confirmed" : "Canceled"}
          </Badge>
        </VStack>
      </Flex>

      <Separator mb={3} />

      <Stack gap={1} mb={3}>
        {booking.items.map((item) => (
          <Flex key={item.id} justify="space-between" align="center">
            <HStack gap={2}>
              <FaTicketAlt size={11} color="gray" />
              <Text fontSize="sm" color="text">
                {item.ticketTypeName} × {item.quantity}
              </Text>
            </HStack>
            <Text fontSize="sm" fontWeight="medium">
              {currencyFormatter.format(item.unitPrice * item.quantity)}
            </Text>
          </Flex>
        ))}
      </Stack>

      <Flex justify="space-between" align="center" mt={2}>
        <Box>
          <Text fontSize="xs" color="text">
            Total
          </Text>
          <Text fontWeight="bold" color="primary">
            {currencyFormatter.format(booking.totalPrice)}
          </Text>
        </Box>

        <HStack gap={2}>
          <Link href={`/events/${booking.eventId}`}>
            <Button size="xs" variant="outline" colorPalette="purple">
              See the event
            </Button>
          </Link>
          {isConfirmed && (
            <Button
              size="xs"
              variant="ghost"
              colorPalette="red"
              loading={isPending}
              loadingText="..."
              onClick={handleCancel}
            >
              Cancel
            </Button>
          )}
        </HStack>
      </Flex>
    </Box>
  );
}
