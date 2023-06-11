import React, { ReactEventHandler } from "react";
import { DropdownItem, DropdownList } from "./styles";
import { DefaultProps } from "lib/Defaults";

interface DefDropdownInterface extends DefaultProps {
    isOpen: boolean;
    items: Array<{
        name: string,
        url?: string;
        onClick?: ReactEventHandler<HTMLButtonElement>
    }>
}

const DefDropdown = (props: DefDropdownInterface) => {
    return(
        <>
        <DropdownList display={props.isOpen ? "block" : "none"} left={15} top={8}>
            {props.items.map(val => {
                return <DropdownItem {...val.onClick}>{val.name}</DropdownItem>
            })}
        </DropdownList>
        </>
    );
};

DropdownItem.defaultProps = {
    hoverBackgroundColor: "#2a2d35",
    hoverColor: "#fff"
}

export default DefDropdown;