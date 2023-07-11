import {
    BillHolder,
    DueDateText,
    BillNameText,
    AmountDueHolder,
    AmountDueText,
    PaidStatus
} from "./styles";

interface BillDataInterface {
    id: number,
    due_date: string
    name: string
    amount: number,
    paid: boolean,
    onClick?: React.MouseEventHandler<HTMLDivElement>,
    paidOnClick?: React.MouseEventHandler<HTMLDivElement>
}

const ListItem = (props: BillDataInterface) => {
    return(
        <BillHolder paid={props.paid} data-id={props.id} onClick={props.onClick}>
            <DueDateText>{`${props.due_date}`}</DueDateText>
            <BillNameText>{props.name}</BillNameText>
            <AmountDueHolder>
                <AmountDueText>${props.amount}</AmountDueText>
            </AmountDueHolder>
            <PaidStatus paid={props.paid} onClick={props.paidOnClick}>
                {props.paid ? "Paid" : "Not Paid"}
            </PaidStatus>
        </BillHolder>
    );
};

export default ListItem;