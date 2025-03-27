"use client";

import { Button, Icon, Wrap } from "@chakra-ui/react";
import Inputs from "./components/inputs";
import ResetPassword from "./components/resetPassword";
import { useUserStore } from "@/store/userStore";
import Link from "next/link";
import { FaArrowLeft } from "react-icons/fa";
import User from "../../../../Back-end/api/entity/User";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

export default function Profile() {
    const { user } = useUserStore();
    // const router = useRouter();
    const [authenticated, setAuthenticated] = useState(false);
    
    useEffect(() => {
        const authToken = localStorage.getItem("authToken");
        if (!authToken) {
            // router.push("/login");
            console.log("tsis lty a, tsis");
            
        } else {
            setAuthenticated(true);
        }
    }, []);

    return (
        <>
            {
                authenticated &&
                <>
                    <Link href="/">
                        <Button ><Icon><FaArrowLeft /></Icon></Button>
                    </Link>
                    <Wrap justify="center" align="center" direction="column" marginTop={3} marginBottom={3}>
                        <Inputs/>
                        <br></br>
                        <br></br>
                        <ResetPassword/>
                        <br></br>
                    </Wrap>
                </>
            }
        </>
    )
}