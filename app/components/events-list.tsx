import { Box, Badge, Flex, Button, Grid, Image, Text } from "@chakra-ui/react";
import Link from "next/link";

export interface Event {
    id: string;
    image: string;
    title: string;
    dateTime: string;
    location: string;
    available: boolean;
    category: string;
  }
  
export interface EventsListProps {
    events: Event[];
  }

const EventCard = ({ event }: { event: Event }) => (
  
  <Box borderWidth="1px" borderRadius="lg" overflow="hidden" shadow="md">
    <Image src={event.image} alt={event.title} objectFit="cover" height="200px" width="100%" />
    <Box p="6">
      <Box display="flex" alignItems="center" justifyContent="space-between">
        <Text fontWeight="semibold" fontSize="xl">
          {event.title}
        </Text>
        <Badge borderRadius="full" px="2" colorScheme={event.available ? "green" : "red"}>
          {event.available ? "Available" : "Full"}
        </Badge>
      </Box>
      <Text mt="2" color="gray.500">
        {event.dateTime}
      </Text>
      <Text mt="2" fontSize="sm" color="gray.600">
        {event.location}
      </Text>
      <Flex mt="2" alignItems="center" gap={2}>
      <Link href={`/event/${event.id}`}><Button mt="4" colorScheme="purple" size="sm">View event</Button></Link>
      <Button mt="4" colorScheme="purple" size="sm" disabled={!event.available} onClick={() => alert("Ticket bought")}>Buy ticket</Button>
      </Flex>
    </Box>
  </Box>
);

 const EventsList = ({ events }: EventsListProps) => {
  return (
    <Grid templateColumns="repeat(auto-fit, minmax(300px, 1fr))" gap={6} padding="6">
      {events.map(event => (
        <EventCard key={event.id} event={event} />
      ))}
    </Grid>
  );
};

export default EventsList;