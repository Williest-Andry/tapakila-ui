import { Center, Flex, Heading, Icon, Table } from "@chakra-ui/react";
import { FaLocationDot } from "react-icons/fa6";
import { ImTicket } from "react-icons/im";

type Ticket = {
    tickets: string[]
};

export default function TicketsTable({ tickets }: Ticket) {
    return (
        <Center mb="8vh">
            <Table.Root size="lg" interactive variant="outline" w="45vw" >
                <Table.Header>
                    <Table.Row>
                        <Table.ColumnHeader h="9vh" pl="5vw">Ticket</Table.ColumnHeader>
                        <Table.ColumnHeader h="9vh" textAlign="end" pr="6vw">Price</Table.ColumnHeader>
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    {tickets.map((ticket) => (
                        <Table.Row h="15vh" key={ticket}>
                            <Table.Cell pl="4vw">
                                <Flex >
                                    <Icon fontSize="2xl">
                                        <ImTicket />
                                    </Icon>
                                    <Heading fontWeight="normal" size="lg" ml="0.8vw">{ticket}</Heading>
                                </Flex>
                            </Table.Cell>
                            <Table.Cell textAlign="end" pr="5vw">MGA {2000000}</Table.Cell>
                        </Table.Row>
                    ))}
                </Table.Body>
            </Table.Root>
        </Center>
    )
}