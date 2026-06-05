import { Box, Center, Container, Spinner, Stack, Text } from "@chakra-ui/react";

export default function Loading() {
  return (
    <Center minH="60vh" bg="background" px={4}>
      <Container maxW="md">
        <Stack
          align="center"
          gap={5}
          p={{ base: 6, md: 8 }}
          border="1px solid"
          borderColor="border"
          borderRadius="2xl"
          bg="white"
          shadow="sm"
          _dark={{ bg: "gray.900", borderColor: "gray.800" }}
        >
          <Box
            display="grid"
            placeItems="center"
            boxSize="72px"
            borderRadius="full"
            bg="cardBackground"
            color="primary"
          >
            <Spinner size="xl" borderWidth="4px" />
          </Box>

          <Stack gap={2} textAlign="center">
            <Text fontSize="xl" fontWeight="bold" color="primary">
              Loading...
            </Text>
            <Text color="text">
              {
                "We're setting up your Tapakila page. It will only take a moment."
              }
            </Text>
          </Stack>
        </Stack>
      </Container>
    </Center>
  );
}
