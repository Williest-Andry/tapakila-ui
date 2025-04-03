import { InputGroup } from "@/components/ui/input-group";
import { Heading, Wrap, Field, Input, Button } from "@chakra-ui/react";
import { BsFillPostageFill } from "react-icons/bs";
import { CiCalendarDate } from "react-icons/ci";
import { FaPhoneAlt } from "react-icons/fa";
import { LuUser } from "react-icons/lu";
import { MdEmail, MdPlace } from "react-icons/md";
import User from "../../../../../Back-end/api/entity/User";
import { useEffect, useState } from "react";
import { emailSchema } from "@/schema/emailSchema";
import { isValidPhone } from "@/schema/phoneNumberValidation";

export default function Inputs() {
    const [formData, setFormData] = useState({} as User);
    const [saved, setSaved] = useState(false);
    const [error, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

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

    const is18YearsOld = (birthday: string): boolean => {
        const date18YearsLater = new Date(birthday);
        const today = new Date();
        date18YearsLater.setFullYear(date18YearsLater.getFullYear() + 18);
        return date18YearsLater <= today;
    };

    const saveModification = async () => {
        const validPhoneNumber = isValidPhone(formData.phone);
        if (validPhoneNumber == false) {
            setError(true);
            setErrorMessage("The phone number is not valid");
            return;
        }
        const result = emailSchema.safeParse(formData.email);
        if (!result.success) {
            setError(true);
            setErrorMessage(result.error.format()._errors[0]);
            return;
        }
        if(!is18YearsOld(formData.birthday)){
            setError(true);
            setErrorMessage("You must be 18 or older");
            return;
        }
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
                if (!response.ok) {
                    setError(true);
                    setErrorMessage("The e-mail or the phone number is already linked with an account");
                    return;
                }
                response.json();
                setSaved(true);
            })
            .catch(error => {
                setError(true);
                setErrorMessage(error);
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
        if (saved) setSaved(false);
        if (error) setError(false);
    }, 3000)

    return (
        <>
            <Heading size="3xl">Personal informations</Heading>
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
                        <Input placeholder="user@example.com" name="email" value={formData.email || ""} onChange={handleChange} />
                    </InputGroup>
                </Field.Root>
                <Field.Root required w="48%">
                    <Field.Label>
                        Birthday <Field.RequiredIndicator />
                    </Field.Label>
                    <InputGroup startElement={<CiCalendarDate />}>
                        <Input type="date" w="15.5vw" value={formData.birthday ? new Date(formData.birthday).toISOString().split("T")[0] : ""} name="birthday" onChange={handleChange} />
                    </InputGroup>
                </Field.Root>
                <Field.Root required w="48%">
                    <Field.Label>
                        Phone number(whatever the country)<Field.RequiredIndicator />
                    </Field.Label>
                    <InputGroup startElement={<FaPhoneAlt />}>
                        <Input placeholder="+261, +317 ...." value={formData.phone || ""} name="phone" onChange={handleChange} />
                    </InputGroup>
                </Field.Root>
                <Field.Root required w="48%">
                    <Field.Label>
                        Country
                    </Field.Label>
                    <InputGroup startElement={<MdPlace />}>
                        <Input placeholder="Country" value={formData.country || ""} name="country" disabled />
                    </InputGroup>
                </Field.Root>
                <Field.Root required w="48%">
                    <Field.Label>
                        City <Field.RequiredIndicator />
                    </Field.Label>
                    <InputGroup startElement={<BsFillPostageFill />}>
                        <Input placeholder="City" value={formData.city || ""} name="city" onChange={handleChange} />
                    </InputGroup>
                </Field.Root>
            </Wrap>
            <br></br>
            <Button colorPalette="purple" onClick={saveModification}>
                Save
            </Button>
            {
                saved && <Heading size="md" color="green.400" m="auto" textAlign="center">Successfully saved</Heading>
            }
            {
                error && <Heading size="md" color="red.500" m="auto" textAlign="center">{errorMessage != "" ? errorMessage : "Couldn't save"}</Heading>
            }
        </>
    )
}