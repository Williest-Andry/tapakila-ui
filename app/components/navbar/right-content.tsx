"use client"
import { ColorModeToggle } from "@/components/color-mode-toggle";
import { InputGroup } from "@/components/ui/input-group";
import { Avatar, Flex, IconButton, Input, InputElement, Skeleton } from "@chakra-ui/react";
import { FaBell, FaSearch } from "react-icons/fa";
import { useState } from "react";
import { useRouter } from 'next/navigation';
import { useUserStore } from "@/store/userStore";

export default function RightNavbarContent(){
    const [searchQuery, setSearchQuery] = useState("");
    const router = useRouter();
    const {user} = useUserStore();

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
        onClick={() =>{
          if(localStorage.getItem("authToken")) {
            router.replace('/profile'); 
          }
          else{
            router.push("/login");
          }
        }}
      >
        {user?.username || "Se connecter"}
      <Avatar.Root variant={"outline"}>
        <Avatar.Fallback name={""} />
        <Avatar.Image />
      </Avatar.Root>
      </IconButton>
      <ColorModeToggle />
    </Flex>
        );
}