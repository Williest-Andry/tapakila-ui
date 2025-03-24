import { InputGroup } from "@/components/ui/input-group";
import { Flex, Heading, Dialog, Button, Portal, CloseButton, Field, Input } from "@chakra-ui/react";
import { LuUser } from "react-icons/lu";

export default function ResetPassword() {
    return (
        <>
            <Flex direction="column">
                <Heading>Réinitialiser votre mot de passe</Heading>
                <Dialog.Root>
                    <Dialog.Trigger asChild>
                        <Button variant="outline" size="sm">
                            Modifier mon mot de passe
                        </Button>
                    </Dialog.Trigger>
                    <Portal>
                        <Dialog.Backdrop />
                        <Dialog.Positioner>
                            <Dialog.Content>
                                <Dialog.Header>
                                    <Dialog.Title>Dialog Title</Dialog.Title>
                                </Dialog.Header>
                                <Dialog.Body>
                                    <Field.Root required>
                                        <Field.Label>
                                            Nouveau mot de passe <Field.RequiredIndicator />
                                        </Field.Label>
                                        <InputGroup startElement={<LuUser />}>
                                            <Input placeholder="Password" />
                                        </InputGroup>
                                    </Field.Root>
                                    <Field.Root required>
                                        <Field.Label>
                                            Confirmer le nouveau mot de passe <Field.RequiredIndicator />
                                        </Field.Label>
                                        <InputGroup startElement={<LuUser />}>
                                            <Input placeholder="Password" />
                                        </InputGroup>
                                    </Field.Root>
                                </Dialog.Body>
                                <Dialog.Footer>
                                    <Dialog.ActionTrigger asChild>
                                        <Button variant="outline">Cancel</Button>
                                    </Dialog.ActionTrigger>
                                    <Button>Save</Button>
                                </Dialog.Footer>
                                <Dialog.CloseTrigger asChild>
                                    <CloseButton size="sm" />
                                </Dialog.CloseTrigger>
                            </Dialog.Content>
                        </Dialog.Positioner>
                    </Portal>
                </Dialog.Root>
            </Flex>
        </>
    )
}