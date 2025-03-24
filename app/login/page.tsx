"use client";

import { useState } from "react";
import { Box, Button, Input, Heading, VStack } from "@chakra-ui/react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError("Tous les champs sont obligatoires.");
      return;
    }
    alert(email + " " + password);
  };

  return (
    <Box minH={"xl"} display="flex" alignItems="center" justifyContent="center">
      <VStack gap={4} p={8} boxShadow="lg" borderRadius="md" bg="white" _dark={{ bg: "gray.900" }}>
        <Heading>Sign in</Heading>
        {error && <Box color="red.500">{error}</Box>}
        <form onSubmit={handleSubmit} style={{ width: "100%" }}>
          <Input
          variant={"flushed"}
          m={2}
            placeholder="E-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
          variant={"flushed"}
          m={2}
            placeholder="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Box textAlign="right">
            <Button colorScheme="blue" variant="ghost" size="sm" m={2}>Sign up</Button>
          </Box>
          <Button mt={4} colorScheme="purple" type="submit" width="full">Login</Button>
        </form>
      </VStack>
    </Box>
  );
}
