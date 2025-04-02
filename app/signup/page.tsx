"use client"
import { emailSchema } from "@/schema/emailSchema";
import { isValidPhone } from "@/schema/phoneNumberValidation";
import { Button, Field, Fieldset, Heading, Input, Wrap } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import CountrySelect from "./components/countrySelect";

type User = {
    username: string,
    email: string,
    password: string,
    birthday: string,
    country: string,
    phone: string,
    city: string
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
        city: ""
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

    const handleCountryChange = (selectedCountry: any) => {
        setFormData((prevForm) => ({
            ...prevForm,
            country: selectedCountry.label.items[0].label
        }));
    };

    const is18YearsOld = (birthday: string): boolean => {
        const date18YearsLater = new Date(birthday);
        const today = new Date();
        date18YearsLater.setFullYear(date18YearsLater.getFullYear() + 18);
        return date18YearsLater <= today;
    };

    const signup = async () => {
        const createdUser = formData;
        try {
            if (Object.values(formData).some(value => value.trim() === "")) {
                throw new Error("All fields are required.");
            }
            if (formData.password != confirmedPassword) {
                throw new Error("La confirmation de mot de passe ne correspond pas au mot de passe donné");
            }
            const result = emailSchema.safeParse(formData.email);
            if (!result.success) {
                throw new Error(result.error.format()._errors[0]);
            }
            const validPhoneNumber = isValidPhone(formData.phone);
            if (validPhoneNumber == false) {
                throw new Error("The phone number is not valid");
            }
            if(!is18YearsOld(formData.birthday)){
                throw new Error("You must be 18 or older");
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
                    throw new Error("The e-mail or the phone number is already linked with an account");
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
                                <Input name="email" value={formData.email} onChange={handleChange} placeholder="user@gmail.com" />
                            </Field.Root>
                            <Field.Root required>
                                <Field.Label>Phone number (whatever the country) <Field.RequiredIndicator /></Field.Label>
                                <Input name="phone" value={formData.phone} onChange={handleChange} placeholder="+261, +317 ...." />
                            </Field.Root>
                            <Field.Root required>
                                <Field.Label>Date de naissance <Field.RequiredIndicator /></Field.Label>
                                <Input type="date" name="birthday" value={formData.birthday} onChange={handleChange} />
                            </Field.Root>
                            <Field.Root required>
                                <Field.Label>Mot de passe <Field.RequiredIndicator /></Field.Label>
                                <Input type="password" name="password" value={formData.password} onChange={handleChange} />
                            </Field.Root>
                            <Field.Root required>
                                <Field.Label>Confirmer le mot de passe <Field.RequiredIndicator /></Field.Label>
                                <Input type="password" name="confirmedPassword" value={confirmedPassword} onChange={(e) => setConfirmedPassword(e.target.value)} />
                            </Field.Root>
                            <Field.Root required>
                                <Field.Label>Pays (Caution: you can't change it after)<Field.RequiredIndicator /></Field.Label>
                                {/* <Input name="country" value={formData.country} onChange={handleChange} /> */}
                                <CountrySelect onChange={handleCountryChange} />
                            </Field.Root>
                            <Field.Root required>
                                <Field.Label>Ville <Field.RequiredIndicator /></Field.Label>
                                <Input name="city" value={formData.city} onChange={handleChange} />
                            </Field.Root>
                        </Fieldset.Content>
                        <Heading size="md" color="red.500" m="auto" textAlign="center">{error as string}</Heading>
                        <Button type="submit" alignSelf="flex-start" m="auto" mt="2vh" mb="2vh" onClick={signup}>
                            S'inscrire
                        </Button>
                    </Fieldset.Root>
                </Wrap>
            }
        </>
    )
};