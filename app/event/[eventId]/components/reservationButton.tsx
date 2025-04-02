"use client"
import { Button, Flex, Heading } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function ReservationButton({ eventId }: { eventId: string }) {
    const router = useRouter();
    const [isDisabled, setIsDisabled] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        if (localStorage.getItem("authToken")) {
            setIsDisabled(false);
            setError(false);
        }
        else {
            setError(true);
            setIsDisabled(true);
        }
    }, [])

    const redirection = () => {
        if (localStorage.getItem("authToken"))
            router.push(`/event/${eventId}/reservation`);
        else {
            router.push("/login");
        }
    }

    return (
        <Flex direction="column">
            <Button colorPalette="blue" variant="outline" size="lg" w="10vw" onClick={redirection} disabled={isDisabled}>
                Book
            </Button>
            {
                error &&
                <Heading color="red.500">You must sign in </Heading>
            }
        </Flex>
    )
}