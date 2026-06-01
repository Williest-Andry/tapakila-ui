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
import { useRegister } from "@/lib/api/queries/auth.queries";
import { registerSchema, type RegisterInput } from "@/schema/auth.schema";

interface FieldError {
  firstName?: string;
  lastName?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
}

export default function RegisterPage() {
  const { mutate: register, isPending, error } = useRegister();

  const [form, setForm] = useState<RegisterInput>({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [fieldErrors, setFieldErrors] = useState<FieldError>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setFieldErrors((prev) => ({ ...prev, [name]: undefined }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const result = registerSchema.safeParse(form);

    if (!result.success) {
      const errors: FieldError = {};
      result.error.errors.forEach((err) => {
        const field = err.path[0] as keyof FieldError;
        if (!errors[field]) errors[field] = err.message;
      });
      setFieldErrors(errors);
      return;
    }

    const { confirmPassword: _, ...body } = result.data;
    register(body);
  };

  const apiError =
    error && typeof error === "object" && "message" in error
      ? (error as { message: string }).message
      : error
        ? "An error has occurred. Please try again."
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
        maxW="440px"
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
            Create an account
          </Heading>
          <Text color="text" fontSize="sm">
            Join Tapakila and book your tickets
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
            <Flex gap={3}>
              <Box flex={1}>
                <Text fontSize="sm" fontWeight="medium" mb={1}>
                  First name
                </Text>
                <Input
                  name="firstName"
                  placeholder="Jean"
                  value={form.firstName}
                  onChange={handleChange}
                  borderColor={fieldErrors.firstName ? "red.400" : undefined}
                  _focus={{
                    borderColor: fieldErrors.firstName
                      ? "red.400"
                      : "brand.500",
                  }}
                />
                {fieldErrors.firstName && (
                  <Text color="danger" fontSize="xs" mt={1}>
                    {fieldErrors.firstName}
                  </Text>
                )}
              </Box>

              <Box flex={1}>
                <Text fontSize="sm" fontWeight="medium" mb={1}>
                  Last name
                </Text>
                <Input
                  name="lastName"
                  placeholder="Dupont"
                  value={form.lastName}
                  onChange={handleChange}
                  borderColor={fieldErrors.lastName ? "red.400" : undefined}
                  _focus={{
                    borderColor: fieldErrors.lastName ? "red.400" : "brand.500",
                  }}
                />
                {fieldErrors.lastName && (
                  <Text color="danger" fontSize="xs" mt={1}>
                    {fieldErrors.lastName}
                  </Text>
                )}
              </Box>
            </Flex>

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
                _focus={{
                  borderColor: fieldErrors.email ? "red.400" : "brand.500",
                }}
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
                placeholder="Min. 8 caractères"
                value={form.password}
                onChange={handleChange}
                borderColor={fieldErrors.password ? "red.400" : undefined}
                _focus={{
                  borderColor: fieldErrors.password ? "red.400" : "brand.500",
                }}
              />
              {fieldErrors.password && (
                <Text color="danger" fontSize="xs" mt={1}>
                  {fieldErrors.password}
                </Text>
              )}
            </Box>

            <Box>
              <Text fontSize="sm" fontWeight="medium" mb={1}>
                Confirm password
              </Text>
              <Input
                name="confirmPassword"
                type="password"
                placeholder="Répétez le mot de passe"
                value={form.confirmPassword}
                onChange={handleChange}
                borderColor={
                  fieldErrors.confirmPassword ? "red.400" : undefined
                }
                _focus={{
                  borderColor: fieldErrors.confirmPassword
                    ? "red.400"
                    : "brand.500",
                }}
              />
              {fieldErrors.confirmPassword && (
                <Text color="danger" fontSize="xs" mt={1}>
                  {fieldErrors.confirmPassword}
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
              loadingText="In progress..."
              mt={2}
            >
              Create my account
            </Button>
          </Stack>
        </form>

        <Text textAlign="center" fontSize="sm" color="text" mt={6}>
          Already have an account?{" "}
          <Link href="/login">
            <Text
              as="span"
              color="brand.600"
              fontWeight="semibold"
              _hover={{ color: "brand.700" }}
            >
              Sign in
            </Text>
          </Link>
        </Text>
      </Box>
    </Flex>
  );
}
