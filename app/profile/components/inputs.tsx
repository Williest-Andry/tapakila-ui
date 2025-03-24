import { InputGroup } from "@/components/ui/input-group";
import { Heading, Wrap, Field, Input, Button} from "@chakra-ui/react";
import { LuUser } from "react-icons/lu";

export default function Inputs() {
    return (
        <>
            <Heading>Vos informations personnelles</Heading>
            <Wrap direction="row" border="2px solid" w="40%" justify="space-between">
                <Field.Root required border="2px solid" w="48%">
                    <Field.Label>
                        Firstname <Field.RequiredIndicator />
                    </Field.Label>
                    <InputGroup startElement={<LuUser />}>
                        <Input placeholder="Firstname" />
                    </InputGroup>
                </Field.Root>
                <Field.Root required border="2px solid" w="48%">
                    <Field.Label>
                        Name <Field.RequiredIndicator />
                    </Field.Label>
                    <InputGroup startElement={<LuUser />}>
                        <Input placeholder="Name" />
                    </InputGroup>
                </Field.Root>
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
                    <InputGroup startElement={<LuUser />}>
                        <Input placeholder="Email" />
                    </InputGroup>
                </Field.Root>
                <Field.Root required w="48%">
                    <Field.Label>
                        Date de naissance <Field.RequiredIndicator />
                    </Field.Label>
                    <InputGroup startElement={<LuUser />}>
                        <Input placeholder="Email" />
                    </InputGroup>
                </Field.Root>
                <Field.Root required w="48%">
                    <Field.Label>
                        Numéro <Field.RequiredIndicator />
                    </Field.Label>
                    <InputGroup startElement={<LuUser />}>
                        <Input placeholder="Email" />
                    </InputGroup>
                </Field.Root>
                <Field.Root required w="48%">
                    <Field.Label>
                        Ville <Field.RequiredIndicator />
                    </Field.Label>
                    <InputGroup startElement={<LuUser />}>
                        <Input placeholder="Password" />
                    </InputGroup>
                </Field.Root>
                <Field.Root required w="48%">
                    <Field.Label>
                        Code Postal <Field.RequiredIndicator />
                    </Field.Label>
                    <InputGroup startElement={<LuUser />}>
                        <Input placeholder="Password" />
                    </InputGroup>
                </Field.Root>
            </Wrap>

            <Button>
                Sauvegarder
            </Button>
        </>
    )
}