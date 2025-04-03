import { Box, Container, Stack, Text } from "@chakra-ui/react";
import Provider from "@/app/components/provider";

export default function Footer() {
    return (
        <Provider>
      <Box bg="gray.900" color="white" py={4} position={"sticky"} top={"90dvh"} h={"75px"} alignItems={"center"} display={"flex"} flexDirection={"column"} justifyContent={"center"}>
        <Container maxW="container.lg">
          <Stack
            direction={{ base: 'column', md: 'row' }}
            justify="center"
            align="center"
          >
            <Text>
              &copy; {new Date().getFullYear()} TAPAKILA. All rights reserved.
            </Text>
          </Stack>
        </Container>
      </Box>
      </Provider>
    );
  }