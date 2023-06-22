import React, { ReactEventHandler } from "react";
import { DropdownItem, DropdownList } from "./styles";
import { DefaultProps } from "lib/Defaults";
import Link from "next/link";

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
                return (
                    <Link href={`${val.url ? val.url : "#"}`}>
                        <DropdownItem onClick={val.onClick}>{val.name}</DropdownItem>
                    </Link>
                )
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