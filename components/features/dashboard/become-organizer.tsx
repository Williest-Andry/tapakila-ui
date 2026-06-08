"use client";

import { Box, Button, Flex, Heading, Text } from "@chakra-ui/react";
import { FaStar } from "react-icons/fa";
import { useBecomeOrganizer } from "@/lib/api/queries/user.queries";
import { useAuthStore } from "@/store/auth.store";
import { useLogout } from "@/lib/api/queries/auth.queries";
import { toaster } from "@/components/ui/toaster";

export default function BecomeOrganizer() {
  const { user } = useAuthStore();
  const { mutate: becomeOrganizer, isPending } = useBecomeOrganizer();
  const { mutate: logout } = useLogout();

  const handleClick = () => {
    becomeOrganizer(undefined, {
      onSuccess: () => {
        toaster.success({
          title: "You are now an organizer!",
          description:
            "[IMPORTANT] You will be logged out to apply your new role. Please sign in again.",
        });
        setTimeout(() => {
          logout();
        }, 2000);
      },
      onError: () => {
        toaster.error({
          title: "Error",
          description: "Unable to change your role.",
        });
      },
    });
  };

  if (!user || user.role !== "USER") return null;

  return (
    <Box
      border="1px solid"
      borderColor="brand.200"
      borderRadius="2xl"
      p={{ base: 5, md: 6 }}
      bg="brand.50"
      _dark={{ bg: "gray.900", borderColor: "brand.800" }}
    >
      <Flex
        direction={{ base: "column", sm: "row" }}
        align={{ base: "flex-start", sm: "center" }}
        justify="space-between"
        gap={4}
      >
        <Flex align="center" gap={3}>
          <Box p={2} bg="brand.100" borderRadius="lg" color="brand.700">
            <FaStar size={18} />
          </Box>
          <Box>
            <Heading fontSize="md" fontWeight="bold" mb={0.5}>
              Become an organizer
            </Heading>
            <Text fontSize="sm" color="text">
              Create and manage your own events on Tapakila. You will need to
              sign in again after upgrading.
            </Text>
          </Box>
        </Flex>

        <Button
          colorPalette="purple"
          size="sm"
          fontWeight="semibold"
          loading={isPending}
          loadingText="Processing..."
          onClick={handleClick}
          flexShrink={0}
        >
          Become organizer
        </Button>
      </Flex>
    </Box>
  );
}
