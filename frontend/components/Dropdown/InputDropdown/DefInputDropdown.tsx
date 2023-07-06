import React from "react";
import { InputHeader, InputHolder } from "ui/components/Settings/ui/SettingsInputStyle";
import {
    DropdownHolder,
    DropdownLabel,
    DropdownList,
    DropdownOption,
    DropdownValue
} from "./styles";
import { DefaultProps } from "lib/Defaults";

interface DropdownInterface extends DefaultProps {
    title: string,
    setValue: React.Dispatch<React.SetStateAction<string>>,
    activeValue: string,
    items: Array<{
        name: string
    }>
}

const Dropdown = (props: DropdownInterface) => {
    const [isActive, setActive] = React.useState(false);

    React.useEffect(() => {
        props.setValue(props.items[0].name);
    }, [])

    return(
        <>
        <InputHeader>{props.title}</InputHeader>
        <InputHolder width="100%">
        <DropdownHolder onClick={() => setActive(!isActive)}>
            <DropdownValue>{props.activeValue}</DropdownValue>
            <DropdownList isActive={isActive}>
                {props.items?.map((data) => {
                    return(
                        <DropdownOption onClick={() => props.setValue(data.name)}>{data.name}</DropdownOption>
                    )
                })}
            </DropdownList>
        </DropdownHolder>
        </InputHolder>
        </>
    )
};

export default Dropdown;