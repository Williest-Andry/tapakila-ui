"use client";

import BecomeOrganizer from "@/components/features/dashboard/become-organizer";
import BookingsList from "@/components/features/dashboard/bookings-list";
import CreateEventForm from "@/components/features/dashboard/create-event-form";
import UserInfo from "@/components/features/dashboard/user-info";
import { useMe } from "@/lib/api/queries/auth.queries";
import { useAuthStore } from "@/store/auth.store";
import { Box, Heading, Stack, Text } from "@chakra-ui/react";

export default function DashboardContent() {
  const { user } = useAuthStore();
  const { data: me } = useMe();
  const currentUser = me ?? user;

  const isOrganizer = currentUser?.role === "ORGANIZER";
  const isAdmin = currentUser?.role === "ADMIN";
  const canCreateEvents = isOrganizer || isAdmin;

  return (
    <Stack gap={8}>
      <Box>
        <Heading fontSize={{ base: "2xl", md: "3xl" }} fontWeight="bold" mb={1}>
          Hey, {currentUser?.firstName ?? "..."} 💜
        </Heading>
        <Text color="text" fontSize="sm">
          Manage your information and view your reservations
        </Text>
      </Box>

      <UserInfo user={currentUser} />

      <BecomeOrganizer />

      {canCreateEvents && <CreateEventForm />}

      <BookingsList />
    </Stack>
  );
}
