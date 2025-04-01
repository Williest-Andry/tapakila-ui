import parsePhoneNumberFromString from "libphonenumber-js";

export const isValidPhone = (phone: string) => {
    const phoneNumber = parsePhoneNumberFromString(phone);
    return phoneNumber ? phoneNumber.isValid() : false;
};