import { Input, RoundedInputProps } from "./styles";

const RoundedTextField: React.FC<RoundedInputProps> = (props) => {
    return(
        <Input 
            // commmon props
            placeholder={props.placeholder}
            value={props.value}
            ref={props.ref}
            onChange={props.onChange}

            padding={props.padding}
            fontSize={props.fontSize}
            border={props.border}
            borderBottomRightRadius={props.borderBottomRightRadius}
            borderTopRightRadius={props.borderTopRightRadius}
            type={props.type}
            />
    );
};

export default RoundedTextField;

RoundedTextField.defaultProps = {
    padding: "0.6rem 0.8rem",
    fontSize: "1rem",
    border: "none",
    borderBottomRightRadius: "20px",
    borderTopRightRadius: "20px"
};
