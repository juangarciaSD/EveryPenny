import { DEFAULT_STYLES } from "lib/Defaults";
import styled from "styled-components";

interface InputProps { 
    isDisabled?: boolean
}

export const InputHeader = styled.p`
    ${DEFAULT_STYLES}

    margin-bottom: 0.750rem;
    font-weight: 600;
`;

export const InputHolder = styled.div`
    ${DEFAULT_STYLES}

    display: flex;
    width: 25%;
    border: 2px solid ${props => props.theme.lineColor};
    transition: border 200ms;
    border-radius: 0.375rem;

    &:focus,
    &:focus-within {
        border-color: ${props => props.theme.secondaryTextColor};
    }
    `;

export const Input = styled.input<InputProps>`
    outline: none;
    border: none;
    padding: 0.5rem;
    font-size: 0.875rem;
    margin: 5px 0px;
    background-color: transparent;
    font-weight: 500;
    width: 100%;
    color: ${props => props.theme.darkBgTextColor};

    ${props => props.isDisabled ? ` 
        color: gray;
    ` : ""} 
`;