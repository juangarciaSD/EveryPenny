import styled from "styled-components";
import { DefaultProps, DEFAULT_STYLES } from "lib/Defaults";

export const DivContainer = styled.div<DefaultProps & { stringStyle: string }>`
    ${DEFAULT_STYLES}
    ${props => props.stringStyle}
`;