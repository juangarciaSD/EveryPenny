import {
    BillHolder,
    DueDateText,
    BillNameText,
    AmountDueHolder,
    AmountDueText
} from "./styles";

interface BillDataInterface {
    due_date: string
    name: string
    amount: number,
    onClick?: React.MouseEventHandler<HTMLDivElement>
}

const ListItem = (props: BillDataInterface) => {
    return(
        <BillHolder onClick={props.onClick}>
            <DueDateText>{`${props.due_date}`}</DueDateText>
            <BillNameText>{props.name}</BillNameText>
            <AmountDueHolder>
                <AmountDueText>${props.amount}</AmountDueText>
            </AmountDueHolder>
        </BillHolder>
    );
};

export default ListItem;