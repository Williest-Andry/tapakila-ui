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
import { toaster } from "@/components/ui/toaster"
import HeroEvent from "../components/heroEvent.tsx"
import { FaArrowLeft } from "react-icons/fa"
import addReservation from "@/lib/reservations/addReservation.ts"

export default function ReservationPage({params}: { params: Promise<{ eventId: string }> }) {
  const [event, setEvent] = useState<Event>({} as Event)
  const [tickets, setTickets] = useState<Ticket[]>([])

  const [vipQuantity, setVipQuantity] = useState<number>(0)
  const [vipPrice, setVipPrice] = useState<number>(0)
  const [standardQuantity, setStandardQuantity] = useState<number>(0)
  const [standardPrice, setStandardPrice] = useState<number>(0)
  const [earlyQuantity, setEarlyQuantity] = useState<number>(0)
  const [earlyPrice, setEarlyPrice] = useState<number>(0)

  const [totalPrice, setTotalPrice] = useState<number>(0)

  const [eventId, setEventId] = useState<string>("")

  const [loading, setLoading] = useState<boolean>(true)

  function submitReservation(typesQuantity: {vip: number, standard: number, early_bird: number}){
    if (typesQuantity.vip > tickets.filter((ticket) => ticket.type === 'vip')[0].availableQuantity){
      throw new Error(`${tickets.filter((ticket) => ticket.type === 'vip')[0].availableQuantity} Vip tickets left`)
    }
    if (typesQuantity.standard > tickets.filter((ticket) => ticket.type === 'standard')[0].availableQuantity){
      throw new Error(`${tickets.filter((ticket) => ticket.type === 'standard')[0].availableQuantity} Standard tickets left`)
    }
    if (typesQuantity.early_bird > tickets.filter((ticket) => ticket.type === 'early_bird')[0].availableQuantity){
      throw new Error(`${tickets.filter((ticket) => ticket.type === 'early_bird')[0].availableQuantity} Early Bird tickets left`)
    }


    if (typesQuantity.vip > 0){
      const vipTicket = tickets.filter(ticket => ticket.type === 'vip')[0];
      try {
        addReservation(localStorage.getItem("userId") || "", vipTicket.id, vipQuantity);
      } catch (error) {
        console.error(error);
      }
    }

    if (typesQuantity.standard > 0){
      const standardTicket = tickets.filter(ticket => ticket.type === 'standard')[0];
      try {
        addReservation(localStorage.getItem("userId") || "", standardTicket.id, standardQuantity);
      } catch (error) {
        console.error(error);
      }
    }

    if (typesQuantity.early_bird > 0){
      const earlyTicket = tickets.filter(ticket => ticket.type === 'early_bird')[0];
      try {
        addReservation(localStorage.getItem("userId") || "", earlyTicket.id, earlyQuantity);
      } catch (error) {
        console.error(error);
      }
    }
  }

  // TODO
  const handleReservation = () => {
    const typesQuantity = {
      vip: vipQuantity,
      standard: standardQuantity,
      early_bird: earlyQuantity,
    };

    try {
          const timeOutId = setTimeout(() => {
            submitReservation(typesQuantity);
          }, 5000);
    
          toaster.success({
            title: "Reservations done",
            description: `Tickets  : ${vipQuantity} - Vip , ${standardQuantity} - Standard , ${earlyQuantity} - Early Bird have been successfully reserved with a total amount of ' ${vipPrice+standardPrice+earlyPrice} € '`,
            action: {
              label: "Undo",
              onClick: () => { clearTimeout(timeOutId);},
            }, duration: 5000,
          });
        } catch (error) {
          console.error("Error doing reservations:", error);
          toaster.error({
            title: "Error",
            description: "An error occurred while doing reservations.",
          });
        }
  }

  useEffect(() => {
    try {
      const fetchData = async () => {
        const eventId = (await params).eventId
        setEventId(eventId)
        try {
          const fetchEvent: Event = await getEventById(eventId);
          setEvent(fetchEvent)
          try {
            const fetchTickets: Ticket[] = await getTicketByEventId(eventId);
            setTickets(fetchTickets)
          } catch (error) {
            console.error("Error fetching tickets:", error)
          }
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
          <HStack w={"75%"} justifyContent="space-between" key={ticket.id}>
            <Text fontSize="lg">{ticket.type} - {ticket.price}€</Text>
            <NumberInput.Root defaultValue="0" unstyled spinOnPress={false} min={0} max={5} onValueChange={(value) => {
                if (ticket.type === "vip") {setVipQuantity(Number(value.value)); setVipPrice(Number(value.value) * ticket.price)}
                else if (ticket.type === "standard") {setStandardQuantity(Number(value.value)); setStandardPrice(Number(value.value) * ticket.price)}
                else if (ticket.type === "early_bird") {setEarlyQuantity(Number(value.value)); setEarlyPrice(Number(value.value) * ticket.price)}
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
          Total: <strong>{vipPrice+standardPrice+earlyPrice} €</strong>
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