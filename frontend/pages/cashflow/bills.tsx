import React from "react";
import NavBar from "ui/components/NavBar/DefNavBar";
import Div from "ui/components/Div";
import { useTheme } from "styled-components";
import Button from "ui/components/Button";
import Input from "ui/components/Settings/ui/SettingsInput";
import Dropdown from "ui/components/Dropdown/InputDropdown";
import { createBill, getBills, updateBill } from "lib/cashflow";
import AppContext from "lib/AppContext";
import { Bills as BillsInterface } from "lib/QueryType/User"
import BillItem from "ui/components/Cashflow/BillItemView";
import Modal from "ui/components/Modal/DefModal";

enum CategoryType {
    Entertainment,
    Fees,
    Groceries,
    Health,
    Mortgage,
    Restaurants,
    Shopping,
    Transportation,
    Travel,
    Utilites,
    Other
}

const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]

const Bills = () => {
    const theme = useTheme();
    const context = React.useContext(AppContext);

    //add bill state
    const [modalActive, setModalActive] = React.useState(false);

    //view bill state
    const [isViewBill, setViewBill] = React.useState(false);
    const [billDetails, setBillDetails] = React.useState<BillsInterface>(null);

    const [billName, setBillName] =  React.useState("");
    const [amount, setAmount] = React.useState("");
    const [dueDate, setDueDate] = React.useState("");
    const [frequency, setFrequency] = React.useState("");
    const [category, setCategory] = React.useState("");

    //response data
    const [bills, setBills] = React.useState<Array<BillsInterface>>([]);

    const saveBill = async() => {
        await createBill({
            name: billName,
            amount: Number(amount),
            due_date: Date.parse(dueDate) as unknown as Date,
            frequency,
            category,
        }, context.user?.uuid).then(data => data.json())
        .then(v => {
            if(v.data) cancel();
        }).catch(e => console.log(e));
    };

    const cancel = () => {
        setBillName("");
        setAmount("");
        setDueDate("");
        setFrequency("Weekly")
        setCategory("Entertainment");
        setModalActive(false);
    }

    const viewBill = (data: BillsInterface) => {
        console.log(data)
        setBillDetails(data);
        setViewBill(true);
    };

    const cancelViewBill = () => {
        setViewBill(false);
    };

    const updateCurrentBill = async() => {
        const res = await updateBill(billDetails, context.user?.uuid).then(v => v.json()).
        then(data => {
            console.log("updated data", data);
        }).catch(e => {
            console.log(e);
        });
        return res;
    };

    React.useEffect(() => {
        setBills(context?.user?.bills)
    }, [context.user]);

    return(
        <>
        <div style={{ backgroundColor: theme.background, height: "100vh"}}>
            <NavBar />
            <Modal title="Add Bill" isModalActive={modalActive} setModalState={setModalActive} onCancelModal={() => cancel()} onSaveModal={() => saveBill()}> 
                <Input title="Name" value={billName} onChange={e => setBillName(e.target.value)} width="100%" />
                <Input title="Amount" specialInputText={"$"} value={amount as unknown as string} onChange={e => setAmount(e.target.value)} type="number" width="100%" />
                <Input title="Date" value={dueDate} onChange={e => setDueDate(e.target.value)} width="100%" />
                <Dropdown title="Frequency" activeValue={frequency} setValue={setFrequency} items={[{
                    name: "Weekly"
                }, {
                    name: "Every Other Week"
                }, {
                    name: "Monthly",
                }, {
                    name: "Every Other Month"
                }, {
                    name: "Every 3 Months"
                }, {
                    name: "Every 6 Month"
                }, {
                    name: "Yearly"
                }, {
                    name: "One Time Only"
                }]} />
                <Dropdown title="Category" activeValue={category} setValue={setCategory} items={[{
                    name: "Entertainment"
                }, {
                    name: "Fees"
                }, {
                    name: "Groceries"
                }, {
                    name: "Health"
                }, {
                    name: "Mortgage"
                }, {
                    name: "Restaurants"
                }, {
                    name: "Shopping"
                }, {
                    name: "Transportation"
                }, {
                    name: "Travel"
                }, {
                    name: "Utilites"
                }, {
                    name: "Other"
                }]} />
            </Modal>
            {/* view bill modal */}
            <Modal title="View Bill" cancelText="Delete" cancelHoverColor="red" isModalActive={isViewBill} setModalState={setViewBill} onCancelModal={() => cancelViewBill()} onSaveModal={() => updateCurrentBill()}>
                <Input title="Name" value={billName} onChange={e => setBillName(e.target.value)} width="100%" />
                <Input title="Amount" specialInputText={"$"} value={billDetails?.amount as unknown as string} onChange={e => setAmount(e.target.value)} type="number" width="100%" />
                <Input title="Date" value={billDetails?.due_date as unknown as string} onChange={e => setDueDate(e.target.value)} width="100%" />
                <Dropdown title="Frequency" activeValue={billDetails?.frequency} setValue={setFrequency} items={[{
                    name: "Weekly"
                }, {
                    name: "Every Other Week"
                }, {
                    name: "Monthly",
                }, {
                    name: "Every Other Month"
                }, {
                    name: "Every 3 Months"
                }, {
                    name: "Every 6 Month"
                }, {
                    name: "Yearly"
                }, {
                    name: "One Time Only"
                }]} />
                <Dropdown title="Category" activeValue={billDetails?.category} setValue={setCategory} items={[{
                    name: "Entertainment"
                }, {
                    name: "Fees"
                }, {
                    name: "Groceries"
                }, {
                    name: "Health"
                }, {
                    name: "Mortgage"
                }, {
                    name: "Restaurants"
                }, {
                    name: "Shopping"
                }, {
                    name: "Transportation"
                }, {
                    name: "Travel"
                }, {
                    name: "Utilites"
                }, {
                    name: "Other"
                }]} />
            </Modal>
            <Div display="flex" flexDirection="column" justifyContent="center" padding={0}>
                <Div width={"65%"} margin={"auto"} padding={0} marginTop={"15px"} display="flex" flexDirection="row" justifyContent="space-between">
                    <h2 style={{ margin: 0 }}>Bills</h2>
                    <Button width={"10%"} marginRight={"0px"} minWidth="fit-content" onClick={() => setModalActive(true)}>Link/Add</Button>
                </Div>
                <Div width="65%" padding="0px" backgroundColor="none" marginTop="15px" margin="auto">
                    {bills?.map(val => {
                        return(
                        <BillItem onClick={() => viewBill(val)} amount={val.amount} name={val.name} due_date={months[new Date(val.due_date).getMonth()] + " " + new Date(val.due_date).getDay()} />
                    )})}
                </Div>
            </Div>
        </div>
        </>
    );
};

export default Bills;