import { useState, useEffect } from "react";
import { Box, Flex, Text } from "@chakra-ui/react";

type CountdownProps = {
  targetDate: string
}

export default function Countdown({ targetDate }: CountdownProps) {
  const calculateTimeLeft = () => {
    const difference = new Date(targetDate).getTime() - new Date().getTime();

    if (difference <= 0) {
      return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    }

    return {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / (1000 * 60)) % 60),
      seconds: Math.floor((difference / 1000) % 60),
    };
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  return (
    <Flex justify="center" align="center"  p={4} gap="5" w="40vw">
      <Box border="2px solid" borderRadius="md" w="25%" h="16vh">
        <Text textAlign="center" mb="1vh" textStyle="6xl">{timeLeft.days}</Text>
        <Box height="0" w="3vw" border="2px solid" m="auto"/>
        <Text textAlign="center">JOURS</Text>
      </Box>
      <Box border="2px solid" borderRadius="md" w="25%" h="16vh">
        <Text textAlign="center" mb="1vh" textStyle="6xl">{timeLeft.hours}</Text>
        <Box height="0" w="3vw" border="2px solid" m="auto"/>
        <Text textAlign="center">HEURES</Text>
      </Box>
      <Box border="2px solid" borderRadius="md" w="25%" h="16vh">
        <Text textAlign="center" mb="1vh" textStyle="6xl">{timeLeft.minutes}</Text>
        <Box height="0" w="3vw" border="2px solid" m="auto"/>
        <Text textAlign="center">MINUTES</Text>
      </Box>
      <Box border="2px solid" borderRadius="md" w="25%" h="16vh">
        <Text textAlign="center" mb="1vh" textStyle="6xl">{timeLeft.seconds}</Text>
        <Box height="0" w="3vw" border="2px solid" m="auto"/>
        <Text textAlign="center">SECONDS</Text>
      </Box>
    </Flex>
  );
};