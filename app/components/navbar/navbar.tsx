import Provider from "@/app/components/provider";
import { HStack } from "@chakra-ui/react";
import RightNavbarContent from "./right-content";
import LeftNavbarContent from "./left-content";

export default function Navbar() {
  return (
    <Provider>
      <HStack 
        w={"full"} 
        alignItems="center" 
        justifyContent="space-between" 
        px={4} 
        py={4}
        borderBottom={"1px solid rgba(128, 128, 128, 0.2)"}
        >
        <LeftNavbarContent />
        <RightNavbarContent />
      </HStack>
    </Provider>
  )
}
