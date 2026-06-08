import type { Metadata } from "next";
import { Container } from "@chakra-ui/react";
import OrganizerEvents from "@/components/features/dashboard/organizer-events";

export const metadata: Metadata = {
  title: "My events",
};

export default function DashboardEventsPage() {
  return (
    <Container maxW="5xl" py={{ base: 6, md: 10 }}>
      <OrganizerEvents />
    </Container>
  );
}
