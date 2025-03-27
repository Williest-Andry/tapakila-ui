import { InputGroup } from "@/components/ui/input-group";
import { Flex, Heading, Dialog, Button, Portal, CloseButton, Field, Input } from "@chakra-ui/react";
import { LuUser } from "react-icons/lu";
import { RiLockPasswordFill } from "react-icons/ri";
import User from "../../../../../Back-end/api/entity/User";

export default function ResetPassword() {
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
                                </Dialog.Header>
                                <Dialog.Body >
                                    <Field.Root required w="100%" mb="2vh">
                                        <Field.Label>
                                            Nouveau mot de passe <Field.RequiredIndicator />
                                        </Field.Label>
                                        <InputGroup startElement={<RiLockPasswordFill />} w="100%">
                                            <Input placeholder="Password" />
                                        </InputGroup>
                                    </Field.Root>
                                    <Field.Root required>
                                        <Field.Label>
                                            Confirmer le nouveau mot de passe <Field.RequiredIndicator />
                                        </Field.Label>
                                        <InputGroup startElement={<RiLockPasswordFill />} w="100%">
                                            <Input placeholder="Password" />
                                        </InputGroup>
                                    </Field.Root>
                                </Dialog.Body>
                                <Dialog.Footer>
                                    <Dialog.ActionTrigger asChild>
                                        <Button variant="outline">Quitter</Button>
                                    </Dialog.ActionTrigger>
                                    <Button variant="outline" colorPalette="red">Sauvegarder</Button>
                                </Dialog.Footer>
                            </Dialog.Content>
                        </Dialog.Positioner>
                    </Portal>
                </Dialog.Root>
            </Flex>
        </>
    )
}