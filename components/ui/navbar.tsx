"use client";

import { useState } from "react";
import {
  Box,
  Flex,
  IconButton,
  Button,
  Stack,
  HStack,
  Icon,
} from "@chakra-ui/react";
import { useColorMode, useColorModeValue } from "@/components/ui/color-mode";
import Link from "next/link";

export default function Navbar() {
  const { colorMode, toggleColorMode } = useColorMode();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Box bg={useColorModeValue("gray.100", "gray.900")} px={4} boxShadow="sm">
      <Flex h={16} alignItems="center" justifyContent="space-between">
        {/* Logo */}
        <Box fontWeight="bold">MyApp</Box>

        {/* Desktop Links */}
        <HStack as="nav" spaceX={4} spaceY={4} display={{ base: "none", md: "flex" }}>
          <NavLink href="/">Home</NavLink>
          <NavLink href="/about">About</NavLink>
          <NavLink href="/contact">Contact</NavLink>
        </HStack>

        {/* Mobile Menu Button */}
        <IconButton
          size="md"
          //icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
          aria-label="Open Menu"
          display={{ md: "none" }}
          onClick={() => setIsOpen(!isOpen)}
        />

        {/* Dark Mode Toggle */}
        <Button onClick={toggleColorMode} ml={4}>
          {colorMode === "light" ? <Icon fontSize="40px" color="tomato"></Icon> : <Icon fontSize="40px" color="tomato"></Icon>}
        </Button>
      </Flex>

      {/* Mobile Menu */}
      {isOpen && (
        <Box pb={4} display={{ md: "none" }}>
          <Stack as="nav" spaceX={4} spaceY={4}>
            <NavLink href="/">Home</NavLink>
            <NavLink href="/about">About</NavLink>
            <NavLink href="/contact">Contact</NavLink>
          </Stack>
        </Box>
      )}
    </Box>
  );
}

function NavLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link href={href}>
      <Button variant="ghost" _hover={{ bg: useColorModeValue("gray.200", "gray.700") }}>
        {children}
      </Button>
    </Link>
  );
}
