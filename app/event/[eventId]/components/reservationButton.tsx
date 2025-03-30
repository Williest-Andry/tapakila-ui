"use client"
import { Button } from "@chakra-ui/react";
import { useRouter } from "next/navigation";

export default function ReservationButton({ eventId }: { eventId: string }) {
    const router = useRouter();

    const redirection = () => {
        if (localStorage.getItem("authToken"))
            router.push(`/event/${eventId}/reservation`);
        else {
            router.push("/login");
        }
    }

    return (
        <Button colorPalette="blue" variant="outline" size="lg" w="10vw" onClick={redirection}>
            Réserver
        </Button>

    )
}