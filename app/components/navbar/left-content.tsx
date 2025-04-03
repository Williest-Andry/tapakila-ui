import { Flex, Link, Image } from "@chakra-ui/react";

export default function LeftNavbarContent(){
    return (
        <Flex alignItems="center" gap={2}>
            <Link href="/" _hover={{textDecoration: "none"}}>
                <Image src="/TapakilaLogo.svg" alt="Tapakila"/>
            </Link>
        </Flex>
    );
}