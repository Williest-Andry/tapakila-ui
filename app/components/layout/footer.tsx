import { Box, Flex, HStack, Text } from "@chakra-ui/react";
import Link from "next/link";

export default function Footer() {
  return (
    <Box as="footer" bg="gray.950" color="gray.400" py={6} mt="auto">
      <Flex
        maxW="7xl"
        mx="auto"
        px={{ base: 4, md: 8 }}
        direction={{ base: "column", md: "row" }}
        justify="space-between"
        align="center"
        gap={4}
      >
        <Text fontSize="sm">
          © {new Date().getFullYear()} Tapakila. All rights reserved.
        </Text>
        <HStack gap={6} fontSize="sm">
          <Link href="/events">
            <Text _hover={{ color: "white" }} transition="color 0.15s">
              Events
            </Text>
          </Link>
          <Link href="/login">
            <Text _hover={{ color: "white" }} transition="color 0.15s">
              Login
            </Text>
          </Link>
        </HStack>
      </Flex>
    </Box>
  );
}
