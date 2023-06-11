import { DEFAULT_STYLES } from "lib/Defaults";
import { styled } from "styled-components";


export const RoundImage = styled.img`
    ${DEFAULT_STYLES}

    width: ${props => props.width};
    height: ${props => props.height};
`;