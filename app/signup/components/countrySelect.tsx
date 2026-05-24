import { Select, Portal, createListCollection } from "@chakra-ui/react";
import CountryList from 'react-select-country-list';

const countryOptions = CountryList().getData();
const countries = createListCollection({
    items: countryOptions.map((country) => {
        return { label: country.label, value: country.value };
    })
})

type CountryOption = { label: string; value: string };

export default function CountrySelect({ onChange }: { onChange: (value: CountryOption) => void }) {
    return (
        <Select.Root
            collection={countries}
            onValueChange={(selectedCountry) => {
                const selectedValue = selectedCountry.value[0];
                const country = countries.items.find((item) => item.value === selectedValue);
                if (country) onChange(country);
            }}
        >
            <Select.HiddenSelect />
            <Select.Control>
                <Select.Trigger>
                    <Select.ValueText placeholder="Choose country" />
                </Select.Trigger>
                <Select.IndicatorGroup>
                    <Select.Indicator />
                </Select.IndicatorGroup>
            </Select.Control>
            <Portal>
                <Select.Positioner>
                    <Select.Content>
                        {countries.items.map((country) => (
                            <Select.Item item={country} key={country.value}>
                                {country.label}
                                <Select.ItemIndicator />
                            </Select.Item>
                        ))}
                    </Select.Content>
                </Select.Positioner>
            </Portal>
        </Select.Root>
    )
}