import * as React from "react";
import styled from "styled-components";

export interface RoundedInputProps {
    //common props
    placeholder?: string;
    value?: string;
    ref?: React.MutableRefObject<HTMLInputElement>;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;

    padding?: string;
    fontSize?: string;
    border?: string;
    borderBottomRightRadius?: string;
    borderTopRightRadius?: string;
    type?: string;
}

export const Input = styled.input<RoundedInputProps>`
    width: 100%;
    height: 100%;
    padding: ${props => props.padding};
    font-size: ${props => props.fontSize};

    border: ${props => props.border};
    background-color: ${props =>
        props.theme.themeName === "light"
            ? "#e1e7f5"
            : props.theme.smallBackground};
    color: ${props => props.theme.textColor};

    border-bottom-right-radius: ${props => props.borderBottomRightRadius};
    border-top-right-radius: ${props => props.borderTopRightRadius};

    &:focus {
        outline: none;
    }
`;