"use client";

import { Box, Heading, Stack, Text } from "@chakra-ui/react";
import { useAuthStore } from "@/store/auth.store";
import { useMe } from "@/lib/api/queries/auth.queries";
import UserInfo from "@/components/features/dashboard/user-info";
import BookingsList from "@/components/features/dashboard/bookings-list";

export default function DashboardContent() {
  const { user } = useAuthStore();
  const { data: me } = useMe();
  const currentUser = me ?? user;

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

      <BookingsList />
    </Stack>
  );
}
