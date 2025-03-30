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
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import { Toaster, toaster } from "@/components/ui/toaster"
import Reservation from "../../../../../Back-end/api/entity/Reservation";
import getUserReservations from "@/lib/reservations/getUserReservations";

export default function ReservationsPage() {
  const [reservations, setReservations] = useState<Reservation[]>([]);

  useEffect(() => {
    async function fetchData() {
        try {
            const fetchReservations: Reservation[] = await getUserReservations('3');
            setReservations(fetchReservations);
        } catch (error) {
            console.error("Error fetching reservations:", error);
        }
    }

    fetchData();
  }, []);

  const cancelReservation = (id: number) => {
    setReservations((prev) =>
      prev.map((res) =>
        res.id === id ? { ...res, status: "Annulée" } : res
      )
    );

    toaster.create({
      title: "Réservation annulée",
      description: `La réservation #${id} a été annulée.`,
      type: "warning",
      duration: 2000,
    });
  };

  return (
    <Box maxW="90dvw" mx="auto" mt={10} p={5} borderWidth="1px" borderRadius="md">
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
                <Button size="lg" colorScheme="red" onClick={() => cancelReservation(reservation.id)} _hover={{ bg: "red" }}>
                    Annuler
                </Button>
                </VStack>
              </HStack>
            </Box>
          </motion.div>
        ))}
      </VStack>
    </Box>
  );
}