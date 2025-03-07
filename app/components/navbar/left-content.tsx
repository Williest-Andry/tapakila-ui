import { Button, Flex, Heading, Link } from "@chakra-ui/react";
import { GoTriangleDown } from "react-icons/go";

export default function LeftNavbarContent(){
    return (
        <Flex alignItems="center" gap={2}>
            <Link href="/" _hover={{textDecoration: "none"}}><Heading size="5xl" >Logo</Heading></Link>
        </Flex>
    );
}