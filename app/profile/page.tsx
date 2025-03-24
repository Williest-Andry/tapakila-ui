import { Wrap } from "@chakra-ui/react";
import Inputs from "./components/inputs";
import ResetPassword from "./components/resetPassword";

export default function Profile() {
    return (
        <Wrap justify="center" align="center" direction="column"> 
        <Inputs />
        <br></br>
        <br></br>
        <ResetPassword />
        <br></br>
        </Wrap>
    )
}