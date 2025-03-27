import { InputGroup } from "@/components/ui/input-group";
import { Heading, Wrap, Field, Input, Button} from "@chakra-ui/react";
import { BsFillPostageFill } from "react-icons/bs";
import { CiCalendarDate } from "react-icons/ci";
import { FaPhoneAlt } from "react-icons/fa";
import { LuUser } from "react-icons/lu";
import { MdEmail, MdPlace } from "react-icons/md";

export default function Inputs() {
    return (
        <>
            <Heading size="3xl">Vos informations personnelles</Heading>
            <Wrap direction="row" w="40%" justify="space-between" mt="1vh">
                <Field.Root required w="48%">
                    <Field.Label>
                        Username <Field.RequiredIndicator />
                    </Field.Label>
                    <InputGroup startElement={<LuUser />}>
                        <Input placeholder="Username" />
                    </InputGroup>
                </Field.Root>
                <Field.Root required w="48%">
                    <Field.Label>
                        Email <Field.RequiredIndicator />
                    </Field.Label>
                    <InputGroup startElement={<MdEmail />}>
                        <Input placeholder="Email" />
                    </InputGroup>
                </Field.Root>
                <Field.Root required w="48%">
                    <Field.Label>
                        Date de naissance <Field.RequiredIndicator />
                    </Field.Label>
                    <InputGroup startElement={<CiCalendarDate />}>
                        <Input type="date" w="15.5vw"/>
                    </InputGroup>
                </Field.Root>
                <Field.Root required w="48%">
                    <Field.Label>
                        Numéro de téléphone<Field.RequiredIndicator />
                    </Field.Label>
                    <InputGroup startElement={<FaPhoneAlt />}>
                        <Input placeholder="Numéro de téléphone" />
                    </InputGroup>
                </Field.Root>
                <Field.Root required w="48%">
                    <Field.Label>
                        Ville <Field.RequiredIndicator />
                    </Field.Label>
                    <InputGroup startElement={<MdPlace />}>
                        <Input placeholder="Ville" />
                    </InputGroup>
                </Field.Root>
                <Field.Root required w="48%">
                    <Field.Label>
                        Code Postal <Field.RequiredIndicator />
                    </Field.Label>
                    <InputGroup startElement={<BsFillPostageFill />}>
                        <Input placeholder="Code Postal" />
                    </InputGroup>
                </Field.Root>
            </Wrap>
            <br></br>
            <Button colorPalette="purple">
                Sauvegarder
            </Button>
        </>
    )
}