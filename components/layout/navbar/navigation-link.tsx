import { HStack, Link as ChakraLink } from "@chakra-ui/react";
import Link from "next/link";

export default function NavigationLink() {
  return (
    <HStack>
      <ChakraLink asChild>
        <Link href={"/"}>Home</Link>
      </ChakraLink>
      <ChakraLink asChild>
        <Link href={"/events"}>Events</Link>
      </ChakraLink>
      <ChakraLink asChild>
        <Link href={"/about"}>about</Link>
      </ChakraLink>
      <ChakraLink asChild>
        <Link href={"/contact"}>Contact</Link>
      </ChakraLink>
    </HStack>
  );
}
