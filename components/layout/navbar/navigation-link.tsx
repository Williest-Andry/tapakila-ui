import { HStack, Link as ChakraLink } from "@chakra-ui/react";
import Link from "next/link";

export default function NavigationLink() {
  return (
    <HStack>
      <ChakraLink asChild focusRing="none">
        <Link href={"/"}>Home</Link>
      </ChakraLink>
      <ChakraLink asChild focusRing="none">
        <Link href={"/events"}>Events</Link>
      </ChakraLink>
    </HStack>
  );
}
