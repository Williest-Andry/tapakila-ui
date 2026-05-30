import { formatDate } from "@/lib/format-date";
import { Event } from "@/types/api.types";
import { Badge, Box, Flex, Text } from "@chakra-ui/react";
import Image from "next/image";
import Link from "next/link";

interface EventCardProps {
  event: Event;
}

export default function EventCard({ event }: EventCardProps) {
  return (
    <Link href={`/events/${event.id}`} style={{ display: "block" }}>
      <Box
        borderRadius="xl"
        overflow="hidden"
        border="1px solid"
        borderColor="border"
        _dark={{ borderColor: "gray.800" }}
        transition="all 0.2s ease"
        _hover={{
          transform: "translateY(-2px)",
          shadow: "md",
          borderColor: "brand.200",
        }}
        bg="white"
        cursor="pointer"
      >
        <Box position="relative" h="200px" w="100%" bg="gray.100">
          {event.imageUrl ? (
            <Image
              src={event.imageUrl}
              alt={event.title}
              fill
              style={{ objectFit: "cover" }}
              sizes="(max-width: 768px) 100vw, 400px"
            />
          ) : (
            <Flex h="100%" align="center" justify="center">
              <Text color="gray.400" fontSize="sm">
                {event.title} image
              </Text>
            </Flex>
          )}

          <Badge
            position="absolute"
            top={3}
            left={3}
            bg={"primary"}
            variant="solid"
            fontSize="xs"
            px={2}
            py={1}
            borderRadius="full"
          >
            {event.category.name}
          </Badge>
        </Box>

        <Box p={4}>
          <Text
            fontWeight="semibold"
            fontSize="md"
            lineClamp={2}
            mb={2}
            _dark={{ color: "white" }}
          >
            {event.title}
          </Text>

          <Text fontSize="sm" color="text" mb={1}>
            📅{" "}
            {event.eventDate ? formatDate(event.eventDate) : "Date to be confirmed"}
          </Text>

          <Text fontSize="sm" color="text" lineClamp={1}>
            📍 {event.location}
          </Text>
        </Box>
      </Box>
    </Link>
  );
}
