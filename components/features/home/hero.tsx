import { Box, Button, Flex, Heading, Text } from "@chakra-ui/react";
import Link from "next/link";

export default function Hero() {
  return (
    <Box
      position="relative"
      overflow="hidden"
      bg="brand.600"
      _dark={{ bg: "gray.900" }}
    >
      <Box
        position="absolute"
        top="-80px"
        right="-80px"
        w="400px"
        h="400px"
        borderRadius="full"
        bg="brand.500"
        opacity={0.3}
        pointerEvents="none"
      />
      <Box
        position="absolute"
        bottom="-120px"
        left="-60px"
        w="350px"
        h="350px"
        borderRadius="full"
        bg="brand.700"
        opacity={0.25}
        pointerEvents="none"
      />

      <Flex
        maxW="7xl"
        mx="auto"
        px={{ base: 6, md: 12 }}
        py={{ base: 20, md: 28 }}
        direction="column"
        align={{ base: "center", md: "flex-start" }}
        textAlign={{ base: "center", md: "left" }}
        position="relative"
        zIndex={1}
        gap={6}
      >
        <Box>
          <Text
            fontSize={{ base: "xs", md: "sm" }}
            fontWeight="semibold"
            color="brand.200"
            letterSpacing="widest"
            textTransform="uppercase"
            mb={3}
          >
            Online Ticket Sales - Madagascar
          </Text>

          <Heading
            as="h1"
            fontSize={{ base: "4xl", md: "5xl", lg: "6xl" }}
            fontWeight="extrabold"
            color="white"
            lineHeight="tight"
            maxW="600px"
            whiteSpace={"pre-line"}
          >
            <Box as="span" color="brand.200">
              Events for you
            </Box>
          </Heading>
        </Box>

        <Text
          fontSize={{ base: "md", md: "lg" }}
          color="brand.100"
          maxW="480px"
          lineHeight="tall"
        >
          Discover and book your tickets for the best events in Madagascar.
        </Text>

        <Flex
          gap={3}
          direction={{ base: "column", sm: "row" }}
          w={{ base: "full", sm: "auto" }}
        >
          <Link href="/events">
            <Button
              size="lg"
              bg="white"
              color="brand.700"
              fontWeight="bold"
              px={8}
              _hover={{ bg: "brand.50", transform: "translateY(-1px)" }}
              transition="all 0.2s"
              w={{ base: "full", sm: "auto" }}
            >
              Explore events
            </Button>
          </Link>

          <Link href="/register">
            <Button
              size="lg"
              variant="outline"
              borderColor="white"
              color="white"
              fontWeight="semibold"
              px={8}
              _hover={{ bg: "whiteAlpha.200", transform: "translateY(-1px)" }}
              transition="all 0.2s"
              w={{ base: "full", sm: "auto" }}
            >
              Create an account
            </Button>
          </Link>
        </Flex>
      </Flex>
    </Box>
  );
}
