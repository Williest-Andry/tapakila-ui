import { Box, Center, HStack, Icon, Text } from "@chakra-ui/react";
import { FaCalendarAlt } from "react-icons/fa";

export default function InfoCard({
  icon,
  label,
  value,
}: {
  icon: typeof FaCalendarAlt;
  label: string;
  value: string;
}) {
  return (
    <HStack
      border="1px solid"
      borderColor="border"
      borderRadius="xl"
      p={4}
      bg="white"
      _dark={{ bg: "gray.900", borderColor: "gray.800" }}
      align="start"
      gap={3}
    >
      <Center
        bg="brand.50"
        color="primary"
        borderRadius="full"
        boxSize={10}
        flexShrink={0}
        _dark={{ bg: "gray.800" }}
      >
        <Icon as={icon} />
      </Center>
      <Box>
        <Text
          color="text"
          fontSize="xs"
          textTransform="uppercase"
          letterSpacing="wide"
        >
          {label}
        </Text>
        <Text fontWeight="semibold">{value}</Text>
      </Box>
    </HStack>
  );
}
