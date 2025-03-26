"use client";

import { Button, Icon, Wrap } from "@chakra-ui/react";
import Inputs from "./components/inputs";
import ResetPassword from "./components/resetPassword";
import { useUserStore } from "@/store/userStore";
import Link from "next/link";
import { FaArrowLeft } from "react-icons/fa";

export default function Profile() {
    const { user } = useUserStore();

    return (
        <>
            <Link href="/">
                <Button ><Icon><FaArrowLeft /></Icon></Button>
            </Link>
            <Wrap justify="center" align="center" direction="column" marginTop={3} marginBottom={3}>
                <Inputs />
                <br></br>
                <br></br>
                <ResetPassword />
                <br></br>
            </Wrap>
        </>
    )
}