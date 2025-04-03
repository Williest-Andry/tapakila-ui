"use client";

import { useEffect, useState } from "react";
import {
  Box,
  Heading,
  VStack,
  Text,
  Badge,
  Button,
  HStack,
  Icon,
  Link,
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import { toaster } from "@/components/ui/toaster"
import Reservation from "../../../../../Back-end/api/entity/Reservation";
import getUserReservations from "@/lib/reservations/getUserReservations";
import deleteReservation from "@/lib/reservations/deleteReservation";
import { useRouter } from "next/navigation";
import { FaArrowLeft } from "react-icons/fa";

export default function ReservationsPage() {
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const router = useRouter();

  useEffect(() => {
    async function fetchData() {
        try {
            const fetchReservations: Reservation[] = await getUserReservations(localStorage.getItem("userId") || "");
            if (!fetchReservations) {
                throw new Error("No reservations found.");
            }
            if (fetchReservations.length > 0) {
                fetchReservations.sort((a, b) => new Date(b.eventDateTime).getTime() - new Date(a.eventDateTime).getTime());
            }
            setReservations(fetchReservations);
        } catch (error) {
            console.error("Error fetching reservations:", error);
        }
    }

    fetchData();
  }, [router]);

  const cancelReservation = (id: number) => {
    try {
      const timeOutId = setTimeout(() => {
        deleteReservation(id);
      }, 3000);
      setReservations((prev) => prev.filter((reservation) => reservation.id !== id));

      toaster.success({
        title: "Reservation cancelled",
        description: "Your reservation has been successfully cancelled.",
        action: {
          label: "Undo",
          onClick: () => { clearTimeout(timeOutId);
                            setReservations((prev) => {
                              const foundReservation = reservations.find(res => res.id === id);
                              return foundReservation ? [...prev, foundReservation] : prev;
                            });
                          },
        },
        duration: 3000,
      });
    } catch (error) {
      console.error("Error cancelling reservation:", error);
      toaster.error({
        title: "Error",
        description: "An error occurred while cancelling the reservation.",
      });
    }
  };

  return (
    <>
      <Link href="/profile" mt={5} mb={5}>
        <Button ><Icon><FaArrowLeft /></Icon></Button>
      </Link>
      <Box maxW="90dvw" mx="auto" mt={5} p={5} borderWidth="1px" borderRadius="md">
      <Heading as="h2" size="2xl" textAlign="center" mb={4}>
        My reservations
      </Heading>

      <VStack gap={4}>
        {reservations.map((reservation) => (
          <motion.div
            key={reservation.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            whileHover={{ scale: 1.02 }}
            style={{ width: "100%" }}
          >
            <Box
              p={4}
              borderWidth="1px"
              borderRadius="lg"
              shadow="md"
              w="full"
              bg={"white"}
              _dark={{ bg: "gray.900" }}
            >
              <HStack justify="space-between">
                <VStack align="start">
                  <Text fontSize="xl" fontWeight="bold">
                    {reservation.eventTitle}
                  </Text>
                  <Text fontSize="sm" fontWeight="bold">
                    {reservation.eventDateTime}
                  </Text>
                  <Text fontSize="sm" fontWeight="bold">
                    {reservation.eventLocation}
                  </Text>
                  <Badge colorScheme={reservation.ticketType === "vip" ? "purple" : reservation.ticketType === "standard" ? "orange" : "blue"}>
                    {reservation.ticketType}
                  </Badge>
                  <Text fontSize="sm">Quantity : <strong>{reservation.quantity}</strong></Text>
                </VStack>
                <VStack>
                <Button size="lg" colorScheme="red" onClick={() => cancelReservation(reservation.id)} _hover={{ bg: "red" }} disabled={new Date(`${reservation.eventDateTime.split(" ")[0]}T${reservation.eventDateTime.split(" ")[1]}Z`).toISOString() < new Date().toISOString()}>
                    Cancel
                </Button>
                </VStack>
              </HStack>
            </Box>
          </motion.div>
        ))}
      </VStack>
    </Box>
    </>
    
  );
}