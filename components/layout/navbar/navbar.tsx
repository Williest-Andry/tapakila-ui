"use client";

import { Avatar, Box, HStack, IconButton, Input, Text } from "@chakra-ui/react";
import { InputGroup } from "@/components/ui/input-group";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FaSearch } from "react-icons/fa";
import { useAuthStore } from "@/store/auth.store";
import { useLogout } from "@/lib/api/queries/auth.queries";
import NavigationLink from "./navigation-link";

export default function Navbar() {
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();
  const { user, isAuthenticated } = useAuthStore();
  const { mutate: logout } = useLogout();

  const handleSearch = () => {
    const q = searchQuery.trim();
    router.push(q ? `/events?search=${encodeURIComponent(q)}` : "/events");
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") handleSearch();
  };

  return (
    <Box
      as="header"
      position="sticky"
      top={0}
      zIndex="sticky"
      bg="white"
      _dark={{ bg: "gray.950" }}
      borderBottom="1px solid"
      borderColor="gray.100"
    >
      <HStack
        maxW="7xl"
        mx="auto"
        px={{ base: 4, md: 8 }}
        py={3}
        justify="space-between"
        align="center"
      >
        <Link href="/">
          <Image
            src="/Tapakila.png"
            alt="Tapakila"
            width={140}
            height={40}
            priority
          />
        </Link>

        <NavigationLink />

        <InputGroup
          display={{ base: "none", md: "flex" }}
          w="360px"
          endElement={
            <IconButton
              aria-label="Search"
              variant="ghost"
              size="sm"
              onClick={handleSearch}
            >
              <FaSearch />
            </IconButton>
          }
        >
          <Input
            placeholder="Search an event..."
            variant="subtle"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={handleKeyDown}
          />
        </InputGroup>

        <HStack gap={2}>
          <IconButton
            aria-label="Search"
            variant="ghost"
            display={{ base: "flex", md: "none" }}
            onClick={handleSearch}
          >
            <FaSearch />
          </IconButton>

          {isAuthenticated() && user ? (
            <HStack gap={2}>
              <IconButton
                variant="ghost"
                rounded="full"
                aria-label="My profile"
                onClick={() => router.push("/dashboard/profile")}
              >
                <Avatar.Root size="sm" variant="subtle" colorPalette="purple">
                  <Avatar.Fallback>
                    {user.firstName[0]}
                    {user.lastName[0]}
                  </Avatar.Fallback>
                </Avatar.Root>
              </IconButton>
              <Text
                fontSize="sm"
                fontWeight="medium"
                display={{ base: "none", md: "block" }}
                cursor="pointer"
                color="brand.600"
                onClick={() => logout()}
              >
                Logout
              </Text>
            </HStack>
          ) : (
            <Link href="/login">
              <Text
                fontSize="sm"
                fontWeight="semibold"
                color="brand.600"
                _hover={{ color: "brand.700" }}
              >
                Login
              </Text>
            </Link>
          )}
        </HStack>
      </HStack>
    </Box>
  );
}
