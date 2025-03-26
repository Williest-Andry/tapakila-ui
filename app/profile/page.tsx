"use client";

import { Wrap } from "@chakra-ui/react";
import Inputs from "./components/inputs";
import ResetPassword from "./components/resetPassword";
import { useUserStore } from "@/store/userStore";

export default function Profile() {
    const { user } = useUserStore();

    return (
        <Wrap justify="center" align="center" direction="column" marginTop={3} marginBottom={3}> 
        <Inputs />
        <br></br>
        <br></br>
        <ResetPassword />
        <br></br>
        </Wrap>
    )
}