import { Flex, Heading, SkeletonText } from "@chakra-ui/react";

export default function Page() {
    return (
        <Flex direction="column" justify="center" alignItems="center" mt="15vh">
            <Heading>LOADING ....</Heading>
            <SkeletonText noOfLines={4} gap="4" />
        </Flex>
    )
}