import styled from "styled-components";
import { DEFAULT_STYLES, DefaultProps } from "lib/Defaults";

export const Input = styled.input<DefaultProps>`
    ${DEFAULT_STYLES}

    transition: 200ms border-color;

    ::placeholder {
        color: #546884;
    }

    :focus {
        border-color: ${props => props.theme.accentColor};
    }
`