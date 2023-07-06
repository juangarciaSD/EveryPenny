import React from 'react';
import { useTheme } from 'styled-components';
import { ButtonStyle, ButtonProps } from './styles';

interface IButton extends ButtonProps {
    // displayed text
    text?: string
    hoverBorder?: string,
}

const Button: React.FC<
    React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> & IButton
> = (props: IButton) => {
    const theme = useTheme();
    return(
        <>
        <ButtonStyle 
            background={(props.backgroundColor || props.bg || props.background) ?? theme.accentColor}
            disabled={props.disabled}
            opacity={props.disabled ? 0.5 : 1}
            hoverBorder={props.hoverBorder}
            {...props}>
            {props.children ?? props.text}
        </ButtonStyle>
        </>
    )
};

export default Button;

Button.defaultProps = {
    outline: "none",
    borderRadius: "5px",
    padding: "7px",
    fontSize: "14px",
    border: "none",
    text: "Button",
    textColor: "white",
    fontWeight: 500,
    hoverOpacity: "65%",
    cursor: "pointer"
}