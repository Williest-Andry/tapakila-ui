import { InputGroup } from "@/components/ui/input-group";
import { Heading, Wrap, Field, Input, Button, Box } from "@chakra-ui/react";
import { BsFillPostageFill } from "react-icons/bs";
import { CiCalendarDate } from "react-icons/ci";
import { FaPhoneAlt } from "react-icons/fa";
import { LuUser } from "react-icons/lu";
import { MdEmail, MdPlace } from "react-icons/md";
import User from "../../../../../Back-end/api/entity/User";
import { useEffect, useState } from "react";

export default function Inputs() {
    const [formData, setFormData] = useState({} as User);
    const [saved, setSaved] = useState(false);
    const [error, setError] = useState(false);

    const fetchUser = async () => {
        await fetch("http://localhost:3001/users/myprofile", {
            headers: { "Authorization": localStorage.getItem("authToken") || "" }
        })
            .then(response => response.json())
            .then(userData => {
                setFormData(userData)
            })
            .catch(error => console.log(error))
    };

    const saveModification = async () => {
        const updatedData = formData;
        await fetch("http://localhost:3001/users/myprofile", {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json',
                "Authorization": localStorage.getItem("authToken") || ""
            },
            body: JSON.stringify(updatedData),
        })
            .then(response => {
                response.json();
                setSaved(true);
            })
            .catch(error => {
                setError(true);
                console.log(error);
            })
    }

    useEffect(() => {
        fetchUser();
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prevForm) => ({
            ...prevForm,
            [name]: value
        } as User));
    }

    setTimeout(() => {
        if(saved) setSaved(false);
        if(error) setError(false);
    }, 2000)

    return (
        <>
            <Heading size="3xl">Vos informations personnelles</Heading>
            <Wrap direction="row" w="40%" justify="space-between" mt="1vh">
                <Field.Root required w="48%">
                    <Field.Label>
                        Username <Field.RequiredIndicator />
                    </Field.Label>
                    <InputGroup startElement={<LuUser />}>
                        <Input placeholder="Username" name="username" value={formData.username ? formData.username : ""} onChange={handleChange} />
                    </InputGroup>
                </Field.Root>
                <Field.Root required w="48%">
                    <Field.Label>
                        Email <Field.RequiredIndicator />
                    </Field.Label>
                    <InputGroup startElement={<MdEmail />}>
                        <Input placeholder="Email" name="email" value={formData.email || ""} onChange={handleChange} />
                    </InputGroup>
                </Field.Root>
                <Field.Root required w="48%">
                    <Field.Label>
                        Date de naissance <Field.RequiredIndicator />
                    </Field.Label>
                    <InputGroup startElement={<CiCalendarDate />}>
                        <Input type="date" w="15.5vw" name="birthdate" onChange={handleChange} />
                    </InputGroup>
                </Field.Root>
                <Field.Root required w="48%">
                    <Field.Label>
                        Numéro de téléphone<Field.RequiredIndicator />
                    </Field.Label>
                    <InputGroup startElement={<FaPhoneAlt />}>
                        <Input placeholder="Numéro de téléphone" name="phone" onChange={handleChange} />
                    </InputGroup>
                </Field.Root>
                <Field.Root required w="48%">
                    <Field.Label>
                        Pays <Field.RequiredIndicator />
                    </Field.Label>
                    <InputGroup startElement={<MdPlace />}>
                        <Input placeholder="Pays" name="country" onChange={handleChange} />
                    </InputGroup>
                </Field.Root>
                <Field.Root required w="48%">
                    <Field.Label>
                        Ville <Field.RequiredIndicator />
                    </Field.Label>
                    <InputGroup startElement={<BsFillPostageFill />}>
                        <Input placeholder="Ville" name="city" onChange={handleChange} />
                    </InputGroup>
                </Field.Root>
            </Wrap>
            <br></br>
            <Button colorPalette="purple" onClick={saveModification}>
                Sauvegarder
            </Button>
            {
                saved && <Heading size="md" color="green.400" m="auto" textAlign="center">Sauvegarde réussie</Heading>
            }
            {
                error && <Heading size="md" color="red.500" m="auto" textAlign="center">Sauvegarde échouée</Heading>
            }
        </>
    )
}