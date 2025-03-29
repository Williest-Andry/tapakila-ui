"use client"
import { ColorModeToggle } from "@/components/color-mode-toggle";
import { InputGroup } from "@/components/ui/input-group";
import { Avatar, Flex, IconButton, Input} from "@chakra-ui/react";
import { FaBell, FaSearch } from "react-icons/fa";
import { useEffect, useState } from "react";
import { usePathname, useRouter } from 'next/navigation';

export default function RightNavbarContent() {
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();
  const [username, setUsername] = useState("Se connecter");
  const pathname = usePathname();

  const updateUsername = () => {
    setUsername(localStorage.getItem("username") || "Se connecter");
  };

  useEffect(() => {
    updateUsername();

    window.addEventListener("storage", updateUsername);

    return () => {
      window.removeEventListener("storage", updateUsername);
    };
  }, []);

  useEffect(() => {
    updateUsername();
  }, [pathname]);

  const handleSubmit = () => {
    router.replace(searchQuery ? `/?title=${searchQuery}` : "/");
  };

  return (
    <Flex alignItems="center" gap={2}>
      <IconButton
        aria-label="search"
        variant={"ghost"}
        colorScheme="purple.800"
        display={{ base: "flex", md: "none" }}
        rounded="full"
        size={"md"}
        onClick={handleSubmit}
      >
        <FaSearch color="purple" />
      </IconButton>
      <InputGroup
        width={"400px"}
        flex="1"
        display={{ base: "none", md: "flex" }}
        endElement={
          <IconButton
            aria-label="search"
            variant={"ghost"}
            colorScheme="purple"
            rounded="full"
            size={"md"}
            onClick={handleSubmit}
          >
            <FaSearch color="purple" />
          </IconButton>
        }
      >
        <Input
          variant={"subtle"}
          placeholder="Search..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyPress={(e) => e.key === "Enter" && handleSubmit()}
          css={{ "--focus-color": "purple" }}
          _hover={{ background: "rgb(0, 0, 0, 0.1)" }}
          transition={"all 0.15s ease-in-out"}
        />
      </InputGroup>
      <IconButton
        aria-label="notifications"
        variant={"ghost"}
        colorScheme="purple"
        rounded="l3"
        size={"md"}
      >
        <FaBell color="purple" />
      </IconButton>
      <IconButton
        variant={"ghost"}
        colorScheme={"purple"}
        rounded={"full"}
        onClick={() => {
          if (localStorage.getItem("authToken")) {
            router.replace('/profile');
          }
          else {
            router.push("/login");
          }
        }}
      >
        {username}
        <Avatar.Root variant={"outline"}>
          <Avatar.Fallback name={""} />
          <Avatar.Image />
        </Avatar.Root>
      </IconButton>
      <ColorModeToggle />
    </Flex>
  );
}