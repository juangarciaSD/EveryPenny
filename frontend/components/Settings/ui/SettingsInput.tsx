import React from "react";
import { 
    Input,
    InputHeader
} from "./SettingsInputStyle";
import { InputHolder } from "./SettingsInputStyle"

const SettingsInput = (props: { title: string, placeholder?, specialInputText?, value: string, onChange?: React.ChangeEventHandler<HTMLInputElement>, disabled?, width?, type? }) => {
    return(
        <>
        <InputHeader>{props.title}</InputHeader>
        <InputHolder width={props.width}>
            {props.specialInputText ?
            <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", marginLeft: "12px"}}>
                {props.specialInputText}
            </div> : null}
            <Input placeholder={props.placeholder ? props.placeholder : props.title} value={props.value} onChange={props.onChange} disabled={props.disabled} isDisabled={props.disabled} type={props.type} width={props.width} />
        </InputHolder>
        </>
    );
};

export default SettingsInput;