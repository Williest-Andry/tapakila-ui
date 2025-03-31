"use client"
import { useEffect, useState } from "react"
import Ticket from "../../../../../../Back-end/api/entity/Ticket.js"
import Event from "../../../../../../Back-end/api/entity/Event.js"
import getEventById from "@/lib/events/getEventById.ts"
import getTicketByEventId from "@/lib/tickets/getTicketByEventId.ts"

import {
  Box,
  Button,
  Input,
  NumberInput,
  Heading,
  Text,
  VStack,
  HStack,
  IconButton,
  Icon,
  Link,
} from "@chakra-ui/react";
import { LuMinus, LuPlus } from "react-icons/lu"
import { Toaster, toaster } from "@/components/ui/toaster"
import HeroEvent from "../components/heroEvent.tsx"
import { FaArrowLeft } from "react-icons/fa"

export default function ReservationPage({params}: { params: Promise<{ eventId: string }> }) {
  const [event, setEvent] = useState<Event>({} as Event)
  const [tickets, setTickets] = useState<Ticket[]>([])

  const [vipQuantity, setVipQuantity] = useState<number>(0)
  const [standardQuantity, setStandardQuantity] = useState<number>(0)
  const [earlyQuantity, setEarlyQuantity] = useState<number>(0)
  const [totalPrice, setTotalPrice] = useState<number>(0)

  const [eventId, setEventId] = useState<string>("")
  const [name, setName] = useState<string>("")
  const [email, setEmail] = useState<string>("")

  const [loading, setLoading] = useState<boolean>(true)

  // TODO
  const handleReservation = () => {
    return toaster.success({
      title: "Update successful",
      description: "File saved successfully to the server",
      action: {
        label: "Undo",
        onClick: () => console.log("Undo"),
      },
    })
  }

  useEffect(() => {
    try {
      const fetchData = async () => {
        const eventId = (await params).eventId
        setEventId(eventId)
        try {
          const fetchEvent: Event = await getEventById(eventId);
          setEvent(fetchEvent)

          const fetchTickets: Ticket[] = await getTicketByEventId(eventId);
          setTickets(fetchTickets)
        } catch (error) {  
          console.error("Error fetching event ID:", error)
        }
      }

      fetchData()
    } catch (error) {
      console.error("Error fetching event data:", error)
    }
    finally {
      setLoading(false)
    }
  }, [])

  if (loading) return (<Box display={"flex"} flexDirection={"column"} alignItems={"center"} alignContent={"center"} justifyContent={"center"} w={"100%"} h={"78.65dvh"}><Heading size={"3xl"}>Loading . . .</Heading></Box>);

  return (<>
      <Link href={`/event/${eventId}`} mt={5} mb={5}>
        <Button ><Icon><FaArrowLeft /></Icon></Button>
      </Link>
    <Box maxW="90dvw" mx="auto" mt={5} p={5} borderWidth="1px" borderRadius="md" mb={5}>
      <HeroEvent event={event}/>

      <br/>

      <Heading as="h2" size="lg" mb={4} textAlign="center">
        Ticket reservation
      </Heading>
      
      <br/>

      <VStack gap={5}>
        {tickets.map((ticket) => 
          <HStack w={"75%"} justifyContent="space-between">
            <Text fontSize="lg" key={ticket.id}>{ticket.type} - {ticket.price}€</Text>
            <NumberInput.Root defaultValue="0" unstyled spinOnPress={false} min={0} max={5} onValueChange={(value) => {
                if (ticket.type === "vip") setVipQuantity(Number(value.value) * ticket.price)
                else if (ticket.type === "standard") setStandardQuantity(Number(value.value) * ticket.price)
                else if (ticket.type === "early_bird") setEarlyQuantity(Number(value.value) * ticket.price)
              }}>
              <HStack gap="2" w={"100%"} justifyContent="space-between">
                <NumberInput.DecrementTrigger asChild>
                  <IconButton variant="outline" size="sm">
                    <LuMinus />
                  </IconButton>
                </NumberInput.DecrementTrigger>
                <NumberInput.ValueText textAlign="center" fontSize="lg" minW="3ch" />
                <NumberInput.IncrementTrigger asChild>
                  <IconButton variant="outline" size="sm">
                    <LuPlus />
                  </IconButton>
                </NumberInput.IncrementTrigger>
              </HStack>
            </NumberInput.Root>
          </HStack>)}
      </VStack>

      <br/>

      <VStack gap={4}>

        <Text fontSize="lg">
          Total: <strong>{vipQuantity+standardQuantity+earlyQuantity} €</strong>
        </Text>

        <Button
          variant="outline"
          size="xl"
          w={"300px"}
          onClick={handleReservation}
          disabled={vipQuantity+standardQuantity+earlyQuantity === 0 || event.availablePlace === 0}
        >
          Book
        </Button>
      </VStack>
    </Box>
  </>
  );
}