import type { TicketType } from "@/types/api.types";
import { Badge, Center, Flex, Heading, Icon, Table, Text } from "@chakra-ui/react";
import { ImTicket } from "react-icons/im";

export default function TicketsTable({ tickets }: { tickets: TicketType[] }) {
  return (
    <Center mb="8vh">
      <Table.Root size="lg" interactive variant="outline" w={{ base: "100%", lg: "60vw" }}>
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeader h="9vh" pl={{ base: 4, lg: "5vw" }}>
              Ticket
            </Table.ColumnHeader>
            <Table.ColumnHeader h="9vh" textAlign="end">
              Availability
            </Table.ColumnHeader>
            <Table.ColumnHeader h="9vh" textAlign="end" pr={{ base: 4, lg: "6vw" }}>
              Price
            </Table.ColumnHeader>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {tickets.map((ticket) => (
            <Table.Row h="15vh" key={ticket.id} opacity={ticket.isActive ? 1 : 0.55}>
              <Table.Cell pl={{ base: 4, lg: "4vw" }}>
                <Flex align="center">
                  <Icon fontSize="2xl">
                    <ImTicket />
                  </Icon>
                  <Heading fontWeight="normal" size="lg" ml="0.8vw">
                    {ticket.name}
                  </Heading>
                </Flex>
                <Text color="gray.500" fontSize="sm" mt={2}>
                  Max {ticket.maxPerUser} per booking
                </Text>
              </Table.Cell>
              <Table.Cell textAlign="end">
                <Badge colorPalette={ticket.availableSeats > 0 && ticket.isActive ? "green" : "red"}>
                  {ticket.isActive && ticket.availableSeats > 0
                    ? `${ticket.availableSeats} left`
                    : "Sold out"}
                </Badge>
              </Table.Cell>
              <Table.Cell textAlign="end" pr={{ base: 4, lg: "6vw" }}>
                $ {ticket.price}
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </Center>
  );
}
