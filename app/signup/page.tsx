"use client"
import { Button, Field, Fieldset, For, Heading, Input, NativeSelect, Stack, Wrap } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

type User = {
    username: string,
    email: string,
    password: string,
    birthday: string,
    country: string,
    phone: string,
    postalCode: string
}

export default function SignUp() {
    const router = useRouter();
    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: "",
        birthday: "",
        country: "",
        phone: "",
        postalCode: ""
    } as User);
    const [error, setError] = useState("");
    const [confirmedPassword, setConfirmedPassword] = useState("");
    const [invited, setInvited] = useState(false);

    useEffect(() => {
        if (localStorage.getItem("authToken")) {
            router.replace("/profile");
        }
        else {
            setInvited(true);
        }
    }, [])

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prevForm) => ({
            ...prevForm,
            [name]: value
        } as User));
    }

    const signup = async () => {
        const createdUser = formData;
        try {
            if (Object.values(formData).some(value => value.trim() === "")) {
                throw new Error("Tous les champs sont obligatoires");
            }
            if (formData.password != confirmedPassword) {
                throw new Error("La confirmation de mot de passe ne correspond pas au mot de passe donné");
            }
            await fetch("http://localhost:3001/users", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(createdUser),
            })
                .then(response => response.json())
                .then(user => {
                    localStorage.setItem("authToken", user.finalCreatedUser.authToken);
                    localStorage.setItem("username", user.finalCreatedUser.username);
                    router.replace("/");
                })
                .catch(error => {
                    console.log(error);
                })
        }
        catch (e: any) {
            setError(e.message);
        }
    }

    return (
        <>
            {
                invited &&
                <Wrap direction="column" justify="center" alignItems="center">
                    <Heading size="2xl">Créer un compte</Heading>
                    <Fieldset.Root size="lg" maxW="md">
                        <Fieldset.Content>
                            <Field.Root required>
                                <Field.Label>Nom d'utilisateur <Field.RequiredIndicator /></Field.Label>
                                <Input name="username" value={formData.username} onChange={handleChange} />
                            </Field.Root>
                            <Field.Root required>
                                <Field.Label>Email <Field.RequiredIndicator /></Field.Label>
                                <Input name="email" value={formData.email} onChange={handleChange} />
                            </Field.Root>
                            <Field.Root required>
                                <Field.Label>Mot de passe <Field.RequiredIndicator /></Field.Label>
                                <Input type="password" name="password" value={formData.password} onChange={handleChange} />
                            </Field.Root>
                            <Field.Root required>
                                <Field.Label>Confirmer le mot de passe <Field.RequiredIndicator /></Field.Label>
                                <Input type="password" name="confirmedPassword" value={confirmedPassword} onChange={(e) => setConfirmedPassword(e.target.value)}/>
                            </Field.Root>
                            <Field.Root required>
                                <Field.Label>Date de naissance <Field.RequiredIndicator /></Field.Label>
                                <Input type="date" name="birthday" value={formData.birthday} onChange={handleChange} />
                            </Field.Root>
                            <Field.Root required>
                                <Field.Label>Pays <Field.RequiredIndicator /></Field.Label>
                                <Input name="country" value={formData.country} onChange={handleChange} />
                            </Field.Root>
                            <Field.Root required>
                                <Field.Label>Numéro de téléphone <Field.RequiredIndicator /></Field.Label>
                                <Input name="phone" value={formData.phone} onChange={handleChange} />
                            </Field.Root>
                            <Field.Root required>
                                <Field.Label>Code postal <Field.RequiredIndicator /></Field.Label>
                                <Input name="postalCode" value={formData.postalCode} onChange={handleChange} />
                            </Field.Root>
                        </Fieldset.Content>
                        <Heading size="md" color="red.500" m="auto">{error as string}</Heading>
                        <Button type="submit" alignSelf="flex-start" m="auto" mt="2vh" mb="2vh" onClick={signup}>
                            S'inscrire
                        </Button>
                    </Fieldset.Root>
                </Wrap>
            }
        </>
    )
};