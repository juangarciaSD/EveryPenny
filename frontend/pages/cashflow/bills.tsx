import React, { EventHandler } from "react";
import NavBar from "ui/components/NavBar/DefNavBar";
import Div from "ui/components/Div";
import { useTheme } from "styled-components";
import Button from "ui/components/Button";
import Input from "ui/components/Settings/ui/SettingsInput";
import Dropdown from "ui/components/Dropdown/InputDropdown";
import { createBill, deleteBill, getBills, updateBill, updatePaidStatus } from "lib/cashflow";
import AppContext from "lib/AppContext";
import { Bills as BillsInterface } from "lib/QueryType/User"
import BillItem from "ui/components/Cashflow/BillItemView";
import { LoadingListView } from "ui/components/Cashflow/BillItemView"
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
    const [details, setDetails] = React.useState<BillsInterface>(null);

    const [name, setName] =  React.useState("");
    const [amount, setAmount] = React.useState("");
    const [dueDate, setDueDate] = React.useState("");
    const [frequency, setFrequency] = React.useState("");
    const [category, setCategory] = React.useState("");

    //current bill states
    const [paid, setPaidStatus] = React.useState("Unpaid");

    //response data
    const [bills, setBills] = React.useState<Array<BillsInterface>>([]);
    const [loadedBill, isLoadingBill] = React.useState(false);

    //get bill and update certain properties
    const getBillAndUpdate = (id: number, data: Partial<BillsInterface>) => {
        const updatedBills = bills.map(val => {
            if(val.id === id) {
                return {
                    ...val,
                    ...data
                }
            } else {
                return val;
            }
        });
        console.log("updated bills", updatedBills)
        setBills(updatedBills);
        return updatedBills;
    }

    const saveBill = async() => {
        await createBill({
            name: name,
            amount: Number(amount),
            due_date: Date.parse(dueDate) as unknown as Date,
            frequency,
            category,
        }, context.user?.uuid).then(data => data.json())
        .then(v => {
            if(v.data) {
                cancel();
                console.log(v.data.bills[0])
                let newBill = v.data.bills[0];
                setBills(prev => [...prev, {
                    name: newBill.name,
                    amount: Number(newBill.amount),
                    due_date: Date.parse(newBill.due_date) as unknown as Date,
                    frequency: newBill.frequency,
                    category: newBill.category,
                    id: newBill.id,
                    ownerId: newBill.ownerId,
                    paid: newBill.paid
                }]);
            };
        }).catch(e => console.log(e));
    };

    const cancel = () => {
        setName("");
        setAmount("");
        setDueDate("");
        setFrequency("Weekly")
        setCategory("Entertainment");
        setModalActive(false);
    }

    const viewBill = (data: BillsInterface) => {
        console.log(data)

        setName(data.name);
        setAmount(data.amount as unknown as string);
        setDueDate(data.due_date as unknown as string);
        setFrequency(data.frequency);
        setCategory(data.category);
        setPaidStatus(data.paid ? "Paid" : "Unpaid");
        
        setDetails(data);
        setViewBill(true);
    };

    const cancelViewBill = () => {
        setViewBill(false);
    };

    const updateCurrentBill = async() => {
        const res = await updateBill({
            name,
            amount: amount as unknown as number,
            due_date: dueDate as unknown as Date,
            frequency,
            category,
            paid: details.paid,
            id: details.id,
            ownerId: details.ownerId
        }, context.user?.uuid).then(v => v.json()).
        then(async(data) => {
            console.log("updated data", data);
            await getBillAndUpdate(details.id, {
                name,
                amount: amount as unknown as number,
                due_date: dueDate as unknown as Date,
                frequency,
                category,
                paid: details.paid,
                id: details.id,
                ownerId: details.ownerId
            });
            cancelViewBill();
        }).catch(e => {
            console.log(e);
        });
        return res;
    };

    const changePaidStatus = async(e: React.MouseEvent<HTMLDivElement, MouseEvent>, bill: BillsInterface) => {
        e.stopPropagation();
        //update bill list state
        const updateStateRes = await getBillAndUpdate(bill.id, {
            paid: !bill.paid
        });
        let paidStatus = await updateStateRes.find(val => val.id === bill.id).paid;
        setTimeout(async() => {
            const res = updatePaidStatus(bill.id, paidStatus, context.user?.uuid, bill.ownerId);
            console.log(res);
        }, 200);    
    };

    const deleteCurrentBill = async() => {
        const res = await deleteBill({
            id: details.id,
            ownerId: details.ownerId
        }, context.user?.uuid);
        bills.splice(bills.findIndex(v => v.id === details.id), 1);
        cancel();
        cancelViewBill();
        console.log("delete bill", res);
    };

    React.useEffect(() => {
        setBills(context?.user?.bills);
        isLoadingBill(true);
    }, [context.user]);

    React.useEffect(() => {
        if(!isViewBill) cancel();
    }, [isViewBill])

    return(
        <>
        <div style={{ backgroundColor: theme.background, height: "100vh"}}>
            <NavBar />
            <Modal title="Add Bill" isModalActive={modalActive} setModalState={setModalActive} onCancelModal={() => cancel()} onSaveModal={() => saveBill()}> 
                <Input title="Name" value={name} onChange={e => setName(e.target.value)} width="100%" />
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
            <Modal title="View Bill" cancelText="Delete" cancelHoverColor="red" isModalActive={isViewBill} setModalState={setViewBill} onCancelModal={() => deleteCurrentBill()} onSaveModal={() => updateCurrentBill()}>
                <Input title="Name" value={name} onChange={e => setName(e.target.value)} width="100%" />
                <Input title="Amount" specialInputText={"$"} value={amount as unknown as string} onChange={e => setAmount(e.target.value)} type="number" width="100%" />
                <Input title="Date" value={dueDate as unknown as string} onChange={e => setDueDate(e.target.value)} width="100%" />
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
                <Dropdown title="Category" activeValue={details?.category} setValue={setCategory} items={[{
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
                <Dropdown title="Paid" activeValue={paid} setValue={setPaidStatus} items={[{
                    name: "Unpaid"
                }, {
                    name: "Paid"
                }]} />
            </Modal>
            <Div display="flex" flexDirection="column" justifyContent="center" width="65%" margin="auto" stringStyle={`
                @media screen and (max-width: 700px) {
                    width: 100%;
                    margin: auto;
                    white-space: nowrap;
                    text-overflow: ellipsis;
                }
            `} padding={0}>
                <Div minWidth={"65%"} maxWidth={"90%"} width="65%" stringStyle={`
                    @media screen and (max-width: 1200px) {
                        width: 100%;
                    }

                    @media screen and (max-width: 700px) {
                        width: 100%!important;

                    }
                `} margin={"auto"} padding={0} marginTop={"15px"} marginBottom={0} display="flex" flexDirection="row" justifyContent="space-between">
                    <h2 style={{ margin: 0 }}>Bills</h2>
                    <Button width={"10%"} marginRight={"0px"} minWidth="fit-content" onClick={() => setModalActive(true)}>Link/Add</Button>
                </Div>
                <Div stringStyle={`
                    @media screen and (max-width: 1200px) {
                        width: 100%;
                    }

                    @media screen and (max-width: 700px) {
                        width: 100%!important;
                    }
                `} minWidth={"65%"} maxWidth={"90%"} width="65%" padding="0px" backgroundColor="transparent" marginTop="15px" margin="auto">
                    {bills?.sort((a, b) => a.id - b.id).map(val => {
                        return(
                        <BillItem onClick={() => viewBill(val)} paidOnClick={(e) => changePaidStatus(e, val)} id={val.id} paid={val.paid} amount={val.amount} name={val.name} due_date={months[new Date(val.due_date).getMonth()] + " " + new Date(val.due_date).getDate()} />
                    )})}
                    {[...Array(5)].map(i => <LoadingListView data={loadedBill} />)}
                </Div>
            </Div>
        </div>
        </>
    );
};

export default Bills;