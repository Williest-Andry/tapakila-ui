import { InputGroup } from "@/components/ui/input-group";
import { Flex, Heading, Dialog, Button, Portal, CloseButton, Field, Input } from "@chakra-ui/react";
import { useState } from "react";
import { RiLockPasswordFill } from "react-icons/ri";

export default function ResetPassword() {
    const [password, setPassword] = useState("");
    const [confirmedPassword, setConfirmedPassword] = useState("");
    const [error, setError] = useState("");
    const [saved, setSaved] = useState(false);
    const savePassword = () => {
        let updatedData = {};
        try {
            if (password == "" || confirmedPassword == "") {
                throw new Error("Les 2 champs sont obligatoires!");
            }
            if (password != confirmedPassword) {
                throw new Error("La confirmation ne corespond pas au nouveau mot de passe!");
            }
            if (password == confirmedPassword) {
                updatedData = {
                    password: confirmedPassword
                };
            }
            fetch("http://localhost:3001/users/myprofile", {
                method: "PUT",
                headers: {
                    'Content-Type': 'application/json',
                    "Authorization": localStorage.getItem("authToken") || ""
                },
                body: JSON.stringify(updatedData),
            })
                .then(response => {
                    response.json();
                    setError("");
                    setSaved(true);
                    setPassword("");
                    setConfirmedPassword("");
                })
                .catch(error => {
                    throw new Error("Modification échouée (serveur)");
                })
        }
        catch (e: any) {
            setError(e.message);
        }

    }

    setTimeout(() => {
        if (saved) setSaved(false);
    }, 2000);

    return (
        <>
            <Flex direction="column">
                <Heading mb="1.7vh">Réinitialiser votre mot de passe</Heading>
                <Dialog.Root placement="center">
                    <Dialog.Trigger asChild>
                        <Button variant="outline" size="sm" colorPalette="red">
                            Modifier mon mot de passe
                        </Button>
                    </Dialog.Trigger>
                    <Portal>
                        <Dialog.Positioner>
                            <Dialog.Content>
                                <Dialog.Header>
                                    <Dialog.Title>Réinitialiser votre mot de passe</Dialog.Title>
                                    <Heading size="md" color="red.500">{error as string}</Heading>
                                    {
                                        saved && <Heading size="md" color="green.400">Modification réussie</Heading>
                                    }
                                </Dialog.Header>
                                <Dialog.Body >
                                    <Field.Root required w="100%" mb="2vh">
                                        <Field.Label>
                                            Nouveau mot de passe <Field.RequiredIndicator />
                                        </Field.Label>
                                        <InputGroup startElement={<RiLockPasswordFill />} w="100%">
                                            <Input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                                        </InputGroup>
                                    </Field.Root>
                                    <Field.Root required>
                                        <Field.Label>
                                            Confirmer le nouveau mot de passe <Field.RequiredIndicator />
                                        </Field.Label>
                                        <InputGroup startElement={<RiLockPasswordFill />} w="100%">
                                            <Input type="password" placeholder="Password" value={confirmedPassword} onChange={(e) => setConfirmedPassword(e.target.value)} />
                                        </InputGroup>
                                    </Field.Root>
                                </Dialog.Body>
                                <Dialog.Footer>
                                    <Dialog.ActionTrigger asChild>
                                        <Button variant="outline">Quitter</Button>
                                    </Dialog.ActionTrigger>
                                    <Button variant="outline" colorPalette="red" onClick={savePassword}>Sauvegarder</Button>
                                </Dialog.Footer>
                            </Dialog.Content>
                        </Dialog.Positioner>
                    </Portal>
                </Dialog.Root>
            </Flex>
        </>
    )
}