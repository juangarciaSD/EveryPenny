import React from "react";
import { DefaultProps } from "lib/Defaults";
import { DivContainer } from "./styles";

interface IDiv extends DefaultProps {
    placeholder?: string;
    onChange?: (event: React.FormEvent<HTMLDivElement>) => void;
    onClick?: React.MouseEventHandler;
    onMouseLeave?: React.MouseEventHandler;
}

type Ref = HTMLDivElement
type Props = React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, 
    HTMLDivElement> & IDiv

const Div = React.forwardRef<Ref, Props>((props: IDiv, ref) => (
    <DivContainer ref={ref} {...props}>
        {props.children}
    </DivContainer>
));

export default Div;

Div.defaultProps = {
    border: "none",
    width: "100%",
    height: "fit-content",
    padding: "5px",
    borderRadius: "8px",
    backgroundColor: "transparent",
}