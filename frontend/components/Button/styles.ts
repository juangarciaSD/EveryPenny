import styled, { css } from "styled-components";
import { DefaultProps, DEFAULT_STYLES } from "lib/Defaults";

export interface ButtonProps extends DefaultProps {
    disabled?: boolean;

    //Hover
    hoverBg?: string;
    hoverOpacity?: number | string;
    hoverTextColor?: string;

};

export const ButtonStyle = styled.button<ButtonProps>`
    ${DEFAULT_STYLES}

    :hover {
        background-color: ${props => props.hoverBg};
        box-shadown: rgb(50 50 93 / 10%) 0px 7px 14px,
            rgb(0 0 0 / 8%) 0px 3px 6px;
            opacity: 0.9;
    }
`;