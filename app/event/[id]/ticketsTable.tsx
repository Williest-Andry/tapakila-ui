import { Center, Table } from "@chakra-ui/react";

type Ticket = {
   tickets: string[]
};

export default function TicketsTable({tickets}: Ticket) {
    return (
        <Center>
            <Table.Root size="lg" interactive variant="outline" w="45vw" >
                <Table.Header>
                    <Table.Row>
                        <Table.ColumnHeader h="9vh" pl="5vw">Ticket</Table.ColumnHeader>
                        <Table.ColumnHeader h="9vh" textAlign="end" pr="5vw">Price</Table.ColumnHeader>
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    {tickets.map((ticket) => (
                        <Table.Row h="15vh" key={ticket}>
                            <Table.Cell pl="5vw">{ticket}</Table.Cell>
                            <Table.Cell textAlign="end" pr="5vw">MGA {200}</Table.Cell>
                        </Table.Row>
                    ))}
                </Table.Body>
            </Table.Root>
        </Center>
    )
}