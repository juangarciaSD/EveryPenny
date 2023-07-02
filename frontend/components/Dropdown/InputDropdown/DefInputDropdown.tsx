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
    onClick,
    items: Array<{
        name: string
    }>
}

const Dropdown = (props: DropdownInterface) => {

    const [isActive, setActive] = React.useState(false);
    const [currentValue, setCurrentValue] = React.useState<number>(0);

    return(
        <>
        <InputHeader>Frequent</InputHeader>
        <InputHolder width="100%">
        <DropdownHolder onClick={() => setActive(!isActive)}>
            <DropdownValue>{props.items[currentValue].name}</DropdownValue>
            <DropdownList isActive={isActive}>
                {props.items?.map((data, val) => {
                    return(
                        <DropdownOption onChange={props.onClick(val)}>{data.name}</DropdownOption>
                    )
                })}
            </DropdownList>
        </DropdownHolder>
        </InputHolder>
        </>
    )
};

export default Dropdown;