import React from "react";
import NavBar from "ui/components/NavBar/DefNavBar";
import Div from "ui/components/Div";
import { useTheme } from "styled-components";
import Button from "ui/components/Button";
import Input from "ui/components/Settings/ui/SettingsInput";
import Dropdown from "ui/components/Dropdown/InputDropdown";

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

const Bills = () => {
    const theme = useTheme();

    const [modalActive, setModalActive] = React.useState(false);

    const [billName, setBillName] =  React.useState("");
    const [amount, setAmount] = React.useState("");
    const [dueDate, setDueDate] = React.useState("");
    const [frequency, setFrequency] = React.useState("");
    const [category, setCategory] = React.useState("");

    const openModal = () => {

    };

    return(
        <>
        <div style={{ backgroundColor: theme.background, height: "100vh"}}>
            <NavBar />
            <div onClick={() => setModalActive(false)} style={{ display: modalActive ? "flex" : "none", position: "fixed", zIndex: 1, left: 0, 
                top: 0, width: "100%", height: "100%", overflow: "auto", backgroundColor: "rgba(0,0,0,0.4)"}}>
                <Div onClick={e => e.stopPropagation()} width={"28%"} height={"90%"} margin={"auto"} padding={"10px"} backgroundColor={theme.background}>
                    <h1 style={{ margin: 0, padding: "10px 10px 0px 10px", color: theme.darkBgTextColor}}>Add Bill</h1>
                    <Div padding={"10px"}>
                        <Input title="Name" value={billName} onChange={e => setBillName(e.target.value)} width="100%" />
                        <Input title="Amount" specialInputText={"$"} value={amount} onChange={e => setAmount(e.target.value)} type="number" width="100%" />
                        <Input title="Date" value={dueDate} onChange={e => setDueDate(e.target.value)} width="100%" />
                        <Input title="Frequency" value={frequency} onChange={e => setFrequency(e.target.value)} width="100%" />
                        <Dropdown onClick={(val) => console.log(val)} items={[{
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
                            name: "Utilities"
                        }, {
                            name: "Other"
                        }]} />
                    </Div>
                    <Div padding="10px">
                        <Button marginRight={"5px"} backgroundColor="transparent" border={"2px solid " + theme.accentColor}>
                            Cancel
                        </Button>
                        <Button border={"2px solid " + theme.accentColor}>
                            Save Bill
                        </Button>
                    </Div>
                </Div>
            </div>  
            <Div display="flex" flexDirection="column" justifyContent="center" padding={0}>
                <Div width={"65%"} margin={"auto"} padding={0} marginTop={"15px"} display="flex" flexDirection="row" justifyContent="space-between">
                    <h2 style={{ margin: 0 }}>Bills</h2>
                    <Button width={"10%"} marginRight={"0px"} onClick={() => setModalActive(true)}>Link/Add</Button>
                </Div>
            </Div>
        </div>
        </>
    );
};

export default Bills;