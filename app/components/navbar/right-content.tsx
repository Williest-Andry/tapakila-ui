import { ColorModeToggle } from "@/components/color-mode-toggle";
import { InputGroup } from "@/components/ui/input-group";
import { Avatar, Flex, IconButton, Input, InputElement, Skeleton } from "@chakra-ui/react";
import { FaBell, FaSearch } from "react-icons/fa";

export default function RightNavbarContent(){
    return (
        <Flex alignItems="center" gap={2}>
            <IconButton 
                aria-label="search"
                variant={"ghost"}
                colorScheme="purple.800"
                display={{base: "flex", md:"none"}}
                rounded="full"
                size={"md"}
            >
                <FaSearch color="purple"/>
            </IconButton>
            <InputGroup 
                width={"400px"}
                flex="1"
                display={{base: "none", md:"flex"}}
                endElement={<IconButton 
                    aria-label="search"
                    variant={"ghost"}
                    colorScheme="purple"
                    rounded="full"
                    size={"md"}
                >
                    <FaSearch color="purple"/>
                </IconButton>}
            >
                <Input variant={"subtle"} placeholder="Search..." css={{ "--focus-color": "purple" }} _hover={{background: "rgb(0, 0, 0, 0.1)"}} transition={"all 0.15s ease-in-out"}/>
            </InputGroup>
            <IconButton 
                aria-label="search"
                variant={"ghost"}
                colorScheme="purple"
                rounded="l3"
                size={"md"}
            >
                <FaBell color="purple"/>
            </IconButton>
            <Avatar.Root>
                <Avatar.Fallback name="Tsy Haiko" />
                {/*<Avatar.Image src="" />*/}
            </Avatar.Root>
            <ColorModeToggle />
        </Flex>
        );
}