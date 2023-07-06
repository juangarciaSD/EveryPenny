import styled from 'styled-components';

export const BillHolder = styled.div`
    display: flex;
    width: 100%;
    padding: 15px 8px;
    border-radius: 5px;
    cursor: pointer;
    transition: 200ms ease-in-out;

    &:hover {
        background-color: ${props => props.theme.canvasBg};
    }
`;

export const DueDateText = styled.span`
    font-weight: 600;
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
