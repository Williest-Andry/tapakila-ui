"use client";

import { Button, Flex, Heading, Icon, SkeletonText, Wrap } from "@chakra-ui/react";
import Inputs from "./components/inputs";
import ResetPassword from "./components/resetPassword";
import Link from "next/link";
import { FaArrowLeft } from "react-icons/fa";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Loading from "../loading";

export default function Profile() {
    const router = useRouter();
    const [authenticated, setAuthenticated] = useState(false);

    useEffect(() => {
        const authToken = localStorage.getItem("authToken");
        if (!authToken) {
            router.push("/login");
        } else {
            setAuthenticated(true);
        }
    }, []);

    const disconnection = async () => {
        await fetch("http://localhost:3001/users/logout", {
            method: "POST",
            headers: { "Authorization": localStorage.getItem("authToken") || "" }
        })
            .then(response => {
                if (response.ok) {
                    localStorage.removeItem("authToken");
                    router.replace("/");
                }
            })
            .catch(error => console.log(error))
    }

    return (
        <>
            {
                authenticated == false &&
                <Loading/>
            }
            {
                authenticated &&
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
                        <br></br>
                        <Button onClick={disconnection}>Déconnection</Button>
                    </Wrap>
                </>
            }
        </>
    )
}