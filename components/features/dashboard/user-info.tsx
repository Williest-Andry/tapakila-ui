"use client";

import { toaster } from "@/components/ui/toaster";
import { useUpdateMe } from "@/lib/api/queries/user.queries";
import { useAuthStore } from "@/store/auth.store";
import type { AuthUser } from "@/types/api.types";
import {
  Avatar,
  Badge,
  Box,
  Button,
  Flex,
  Grid,
  Heading,
  Input,
  Stack,
  Text,
} from "@chakra-ui/react";
import { useState } from "react";

interface UserInfoProps {
  user: AuthUser | null;
}

const ROLE_PALETTE: Record<string, string> = {
  ADMIN: "red",
  ORGANIZER: "purple",
  USER: "green",
};

export default function UserInfo({ user }: UserInfoProps) {
  const { setUser } = useAuthStore();
  const [isEditing, setIsEditing] = useState(false);
  const [form, setForm] = useState({
    firstName: user?.firstName ?? "",
    lastName: user?.lastName ?? "",
    email: user?.email ?? "",
  });

  const { mutate: updateProfile, isPending } = useUpdateMe();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSave = () => {
    if (!form.firstName.trim() || !form.lastName.trim()) {
      toaster.error({
        title: "Required fields",
        description: "First and last names are required",
      });
      return;
    }

    updateProfile(form, {
      onSuccess: (data) => {
        setUser(data);
        setIsEditing(false);
        toaster.success({
          title: "Profile updated",
          description: "Your information has been saved.",
        });
      },
      onError: () => {
        toaster.error({
          title: "Error",
          description: "Unable to update the profile.",
        });
      },
    });
  };

  const handleCancel = () => {
    setForm({
      firstName: user?.firstName ?? "",
      lastName: user?.lastName ?? "",
      email: user?.email ?? "",
    });
    setIsEditing(false);
  };

  if (!user) return null;

  return (
    <Box
      border="1px solid"
      borderColor="border"
      borderRadius="2xl"
      p={{ base: 5, md: 7 }}
      bg="white"
      _dark={{ bg: "gray.900", borderColor: "gray.800" }}
      shadow="sm"
    >
      <Flex
        direction={{ base: "column", sm: "row" }}
        align={{ base: "flex-start", sm: "center" }}
        justify="space-between"
        gap={4}
        mb={6}
      >
        <Flex align="center" gap={4}>
          <Avatar.Root size="lg" colorPalette="purple" variant="subtle">
            <Avatar.Fallback>
              {user.firstName[0]}
              {user.lastName[0]}
            </Avatar.Fallback>
          </Avatar.Root>
          <Box>
            <Heading fontSize="lg" fontWeight="bold">
              {user.firstName} {user.lastName}
            </Heading>
            <Badge
              colorPalette={ROLE_PALETTE[user.role] ?? "gray"}
              variant="subtle"
              fontSize="xs"
              mt={1}
            >
              {user.role}
            </Badge>
          </Box>
        </Flex>

        {!isEditing && (
          <Button
            size="sm"
            variant="outline"
            colorPalette="purple"
            onClick={() => setIsEditing(true)}
          >
            Modify
          </Button>
        )}
      </Flex>

      {isEditing ? (
        <Stack gap={4}>
          <Grid templateColumns={{ base: "1fr", sm: "repeat(2, 1fr)" }} gap={4}>
            <Box>
              <Text fontSize="xs" fontWeight="medium" color="text" mb={1}>
                First name
              </Text>
              <Input
                name="firstName"
                value={form.firstName}
                onChange={handleChange}
                size="sm"
              />
            </Box>
            <Box>
              <Text fontSize="xs" fontWeight="medium" color="text" mb={1}>
                Last name
              </Text>
              <Input
                name="lastName"
                value={form.lastName}
                onChange={handleChange}
                size="sm"
              />
            </Box>
          </Grid>

          <Box>
            <Text fontSize="xs" fontWeight="medium" color="text" mb={1}>
              Email
            </Text>
            <Input
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              size="sm"
            />
          </Box>

          <Flex gap={3} justify="flex-end" mt={2}>
            <Button size="sm" variant="ghost" onClick={handleCancel}>
              Cancel
            </Button>
            <Button
              size="sm"
              colorPalette="purple"
              loading={isPending}
              loadingText="Saving..."
              onClick={handleSave}
            >
              Save
            </Button>
          </Flex>
        </Stack>
      ) : (
        <Grid templateColumns={{ base: "1fr", sm: "repeat(3, 1fr)" }} gap={4}>
          <Box>
            <Text fontSize="xs" color="text" mb={1}>
              First name
            </Text>
            <Text fontWeight="medium">{user.firstName}</Text>
          </Box>
          <Box>
            <Text fontSize="xs" color="text" mb={1}>
              Last name
            </Text>
            <Text fontWeight="medium">{user.lastName}</Text>
          </Box>
          <Box>
            <Text fontSize="xs" color="text" mb={1}>
              Email
            </Text>
            <Text fontWeight="medium">{user.email}</Text>
          </Box>
        </Grid>
      )}
    </Box>
  );
}
