import React, { EventHandler, InputHTMLAttributes } from "react";
import { 
    Input,
    InputHeader
} from "./SettingsInputStyle";
import { InputHolder } from "./SettingsInputStyle"

const SettingsInput = (props: { title: string, value: string, onChange?: React.ChangeEventHandler<HTMLInputElement>, disabled? }) => {
    return(
        <>
        <InputHeader>{props.title}</InputHeader>
        <InputHolder>
            <Input placeholder={props.title} value={props.value} onChange={props.onChange} disabled={props.disabled} isDisabled={props.disabled}/>
        </InputHolder>
        </>
    );
};

export default SettingsInput;