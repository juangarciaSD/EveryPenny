import { DEFAULT_STYLES, DefaultProps } from "lib/Defaults";
import styled from "styled-components";

interface DropdownProps extends DefaultProps {
    left?: number;
    top?: number;
}

export const DropdownList = styled.div<DropdownProps>`
    ${DEFAULT_STYLES}

    position: absolute;
    border-radius: 8px;
    background-color: #f9f9f9;
    box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
    padding: 12px;
    min-width: 160px;
    z-index: 1;

    margin-top: ${props => props.top || 0}px;

    left: ${props => props.left || 50}% !important;
    right: auto !important;
    text-align: center !important;
    transform: translate(-50%, 0) !important;
`;

export const DropdownItem = styled.button<DefaultProps>`
    ${DEFAULT_STYLES}

    border-radius: 5px;
    padding: 12px 5px;
    border: none;
    width: 100%;
    background-color: inherit;
    color: #000;
    font-size: 12px;
    font-weight: 500;
    cursor: pointer;
    transition: 200ms ease-in-out;
`;


// outline: "none",
//     borderRadius: "5px",
//     padding: "7px",
//     fontSize: "14px",
//     border: "none",
//     text: "Button",
//     textColor: "white",
//     fontWeight: 500,
//     hoverOpacity: "65%",
//     cursor: "pointer"