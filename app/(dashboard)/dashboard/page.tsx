import type { Metadata } from "next";
import { Container } from "@chakra-ui/react";
import DashboardContent from "@/components/features/dashboard/dashboard-content";

export const metadata: Metadata = {
  title: "My space",
};

export default function DashboardPage() {
  return (
    <Container maxW="5xl" py={{ base: 6, md: 10 }}>
      <DashboardContent />
    </Container>
  );
}
