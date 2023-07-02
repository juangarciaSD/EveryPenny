import { styled } from "styled-components";

interface DropdownInterface {
    isActive: boolean
}

export const DropdownHolder = styled.div`
`;

export const DropdownLabel = styled.label``;

export const DropdownValue = styled.div`
    padding: 0.5rem;
    font-size: 0.875rem;
    margin: 5px 0px;
    cursor: pointer;
`;

export const DropdownList = styled.div<DropdownInterface>`
    position: absolute;
    display: ${props => props.isActive ? "flex" : "none"};
    flex-direction: column;
    background-color: #fff;
    color: ${props => props.theme.darkBgTextColor};
    width: 20%;
    padding: 0.5rem;
    font-size: 0.875rem;
    border-radius: 5px;
    background-color: #000;

    margin-top: 8px;

    :hover {
        background-color: ${props => props.theme.background};
    }
`;

export const DropdownOption = styled.div`
    font-weight: 600;
    padding: 5px;
    cursor: pointer;
    border-radius: 5px;
    background-color: ${props => props.theme.background};

    :not(:first-child) :not(:last-child) { 
        border-radius: 0px;
    }
`;