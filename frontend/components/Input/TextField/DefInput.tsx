import React, { HTMLInputTypeAttribute, InputHTMLAttributes } from "react";
import { DefaultProps } from "lib/Defaults";
import { Input } from "./styles";

type Ref = HTMLInputElement;
type Props = React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> & DefaultProps;

const TextField = React.forwardRef<Ref, Props>((props: DefaultProps, ref) => (
    <Input ref={ref} {...props} />
));

export default TextField;

TextField.defaultProps = {
    
};