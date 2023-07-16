import styled from 'styled-components';

export const BillHolder = styled.div<{ paid: boolean }>`
    display: flex;
    width: 100%;
    padding: 15px 8px;
    border-radius: 5px;
    cursor: pointer;
    transition: 200ms ease-in-out;
    align-items: center;

    &:hover {
        background-color: ${props => props.theme.canvasBg};
    }

    @media screen and (max-width: 700px) {
        background-color: ${props => props.paid ? "green" : "transparent"};
    }
`;

export const DueDateText = styled.span`
    font-weight: 600;
    @media screen and (min-width: 700px) {
        max-width: 50px!important;
        white-space: nowrap!important;
    }

    @media screen and (min-width: 345px) {
        max-width: 35px;
        white-space: break-spaces;
    }
`;

export const BillNameText = styled.span`
    padding-left: 12px;
`;

export const AmountDueHolder = styled.div`
    margin-left: auto;
`;

export const AmountDueText = styled.span`
    font-weight: 300;
`;

export const PaidStatus = styled.div<{paid: boolean}>`
    margin-left: 8px;
    border: ${props => props.paid ? "2px solid green" : "2px solid gray"};
    padding: 2px 8px;
    border-radius: 12px;
    transition: 200ms ease-in-out;
    
    &:hover {
        border-color: green;
    }

    @media screen and (max-width: 700px) {
        display: none;
    }
`;