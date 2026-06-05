import {
  Badge,
  Button,
  Container,
  Heading,
  Stack,
  Text,
} from "@chakra-ui/react";
import Link from "next/link";

export default function NotFound() {
  return (
    <Container maxW="2xl" py={{ base: 16, md: 24 }}>
      <Stack
        align="center"
        gap={6}
        textAlign="center"
        p={{ base: 6, md: 10 }}
        border="1px solid"
        borderColor="border"
        borderRadius="2xl"
        bg="white"
        shadow="sm"
        _dark={{ bg: "gray.900", borderColor: "gray.800" }}
      >
        <Badge
          px={4}
          py={2}
          borderRadius="full"
          bg="cardBackground"
          color="primary"
          fontSize="sm"
        >
          {"404 · Page Not Found"}
        </Badge>

        <Stack gap={3}>
          <Heading size={{ base: "2xl", md: "3xl" }} color="primary">
            {"Oops, this page doesn't exist."}
          </Heading>
          <Text color="text" fontSize="lg">
            {
              "The link may be incorrect, or the page you're looking for has been moved."
            }
          </Text>
        </Stack>

        <Button asChild colorPalette="purple" size="lg">
          <Link href="/events">See all events</Link>
        </Button>
      </Stack>
    </Container>
  );
}
