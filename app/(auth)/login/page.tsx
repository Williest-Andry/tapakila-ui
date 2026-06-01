"use client";

import {
  Box,
  Button,
  Flex,
  Heading,
  Input,
  Stack,
  Text,
} from "@chakra-ui/react";
import Link from "next/link";
import { useState } from "react";
import { useLogin } from "@/lib/api/queries/auth.queries";
import { loginSchema, type LoginInput } from "@/schema/auth.schema";

interface FieldError {
  email?: string;
  password?: string;
}

export default function LoginPage() {
  const { mutate: login, isPending, error } = useLogin();

  const [form, setForm] = useState<LoginInput>({ email: "", password: "" });
  const [fieldErrors, setFieldErrors] = useState<FieldError>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setFieldErrors((prev) => ({ ...prev, [name]: undefined }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const result = loginSchema.safeParse(form);
    if (!result.success) {
      const errors: FieldError = {};
      result.error.errors.forEach((err) => {
        const field = err.path[0] as keyof FieldError;
        if (!errors[field]) errors[field] = err.message;
      });
      setFieldErrors(errors);
      return;
    }

    login(result.data);
  };

  const apiError =
    error && typeof error === "object" && "message" in error
      ? (error as { message: string }).message
      : error
        ? "Incorrect email address or password."
        : null;

  return (
    <Flex
      minH="100vh"
      align="center"
      justify="center"
      bg="gray.50"
      _dark={{ bg: "gray.950" }}
      px={4}
    >
      <Box
        w="full"
        maxW="400px"
        bg="white"
        _dark={{ bg: "gray.900" }}
        borderRadius="2xl"
        border="1px solid"
        borderColor="gray.100"
        p={{ base: 6, md: 8 }}
        shadow="sm"
      >
        <Box mb={8} textAlign="center">
          <Heading fontSize="2xl" fontWeight="bold" mb={2}>
            Log in
          </Heading>
          <Text color="text" fontSize="sm">
            Glad to see you back on Tapakila
          </Text>
        </Box>

        {apiError && (
          <Box
            mb={4}
            p={3}
            bg="red.50"
            _dark={{ bg: "red.950" }}
            borderRadius="lg"
            border="1px solid"
            borderColor="red.200"
          >
            <Text color="danger" fontSize="sm">
              {apiError}
            </Text>
          </Box>
        )}

        <form onSubmit={handleSubmit}>
          <Stack gap={4}>
            <Box>
              <Text fontSize="sm" fontWeight="medium" mb={1}>
                Email
              </Text>
              <Input
                name="email"
                type="email"
                placeholder="jean@example.com"
                value={form.email}
                onChange={handleChange}
                borderColor={fieldErrors.email ? "red.400" : undefined}
              />
              {fieldErrors.email && (
                <Text color="danger" fontSize="xs" mt={1}>
                  {fieldErrors.email}
                </Text>
              )}
            </Box>

            <Box>
              <Text fontSize="sm" fontWeight="medium" mb={1}>
                Password
              </Text>
              <Input
                name="password"
                type="password"
                placeholder="Your password"
                value={form.password}
                onChange={handleChange}
                borderColor={fieldErrors.password ? "red.400" : undefined}
              />
              {fieldErrors.password && (
                <Text color="danger" fontSize="xs" mt={1}>
                  {fieldErrors.password}
                </Text>
              )}
            </Box>

            <Button
              type="submit"
              colorPalette="purple"
              size="lg"
              w="full"
              fontWeight="semibold"
              loading={isPending}
              loadingText="Log in..."
              mt={2}
            >
              Sign in
            </Button>
          </Stack>
        </form>

        <Text textAlign="center" fontSize="sm" color="text" mt={6}>
          Don't have an account yet?{" "}
          <Link href="/register">
            <Text
              as="span"
              color="brand.600"
              fontWeight="semibold"
              _hover={{ color: "brand.700" }}
            >
              Sign up
            </Text>
          </Link>
        </Text>
      </Box>
    </Flex>
  );
}
