import React from "react";
import { 
    PreBillHolder,
    PreDateHolder,
    PreTitleHolder,
    PreAmountHolder,
    PrePaidStatusHolder
} from "./styles";

const LoadingListItem = (props: { data: boolean }) => {
    return(
        <PreBillHolder loadedBills={props.data}>
            <PreDateHolder />
            <PreTitleHolder />
            <PreAmountHolder />
            <PrePaidStatusHolder />
        </PreBillHolder>
    );
};

export default LoadingListItem;