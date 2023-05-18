import styled from "styled-components";

interface FormProps {
    backgroundColor?: string;
}

export const Form = styled.div<FormProps>`
    align-self: center;
    background-color: #fff;
    padding: 2rem 5rem;
    border-radius: 10px;
    min-width: 32rem;
    background-color: ${props => props.backgroundColor};
`;

export const FormHeader = styled.h1`
    font-family: canada-type-gibson,Arial,sans-serif;
    text-align: center;
    font-size: 1.9rem;
    font-weight: 600;
    margin: 0;
    margin-top: 1.5rem;
    color: ${props => props.theme.textColor};
`;

export const FormSubHeader = styled.h2`
    font-family: canada-type-gibson,Arial,sans-serif;
    text-align: center;
    font-weight: 400;
    font-size: 1rem;
    line-height: 1.25;
    margin: 0;
    margin-top: 0.25rem;
    color: ${props => props.theme.textColor};

    :hover {
        span {
            opacity: 0.6;
        }
    }
`;


//#111827
export const InputDiv = styled.div`
    display: flex;
    border: 2px solid ${props => props.theme.lineColor};
    transition: border 200ms;
    border-radius: 0.375rem;

    &:focus,
    &:focus-within {
        border-color: ${props => props.theme.secondaryTextColor};
    }

    div:first-child {
        flex: 5;
    }

    div:last-child {
        display: flex;
        flex: 1;
    }

    svg {
        width: 1rem;
        height: 1rem;
        margin: auto;
        vertical-align: middle;
        fill: #8f8f8f;
    }
`;

interface FormInputProps {
    borderBottomColor?: string;
    color: string;
};

export const FormInput = styled.input<FormInputProps>`
    width: 100%;
    outline: none;
    border: none;
    border-bottom: 1px solid ${props => props.borderBottomColor};
    padding: 0.5rem;
    font-size: 0.875rem;
    margin: 5px 0px;
    color: ${props => props.color};
    background-color: transparent;
    font-weight: 500;
`;

interface SubTextProps {
    marginTop?: string;
    fontSize?: string;
    color: string;
};

export const SubText = styled.h6<SubTextProps>`
    color: ${props => props.color};
    font-size: ${props => (!props.fontSize ? "0.8rem" : props.fontSize)};
    font-weight: 450;
    line-height: 1.5;
    margin-top: ${props => (props.marginTop !== null ? props.marginTop : null)};

    span {
        /* color: ${props => props.theme.accentColor}; */
        color: #111827;
        font-weight: bold;
        cursor: pointer;
    }
`;