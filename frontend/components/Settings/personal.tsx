import React, { InputHTMLAttributes, useContext } from "react";
import { useTheme } from "styled-components";
import Div from "../Div/DefDiv";
import SettingsInput from "./ui/SettingsInput";
import AppContext from "lib/AppContext";
import Button from "../Button/DefButton";
import { getCurrentUser } from "lib/auth";

interface SettingsInputInterface {
    inputProps: InputHTMLAttributes<HTMLInputElement>
}

const Personal = () => {
    const { user } = useContext(AppContext);
    const theme = useTheme();

    const [disabled, setDisabled] = React.useState(true);

    //input states
    const [name, setName] = React.useState<string>("");
    const [email, setEmail] = React.useState<string>("");
    const [phoneNumber, setPhoneNumber] = React.useState<string>("");

    //add user data to states
    React.useEffect(() => {
        if(user) {
            setName(user?.firstName + " " + user?.lastName);
            setEmail(user?.email);
            setPhoneNumber(user?.phoneNumber);
        }
    }, [user]);

    React.useEffect(() => {
        if(user && user?.email !== email || user?.phoneNumber != phoneNumber || (user?.firstName + " " + user?.lastName) != name) {
            setDisabled(false);
        } else setDisabled(true);
    }, [name, email, phoneNumber, user]);

    const updateUser = async() => {
        const data = await fetch(`${process.env.API_DOMAIN}/user/update`, {
            method: "PUT",
            credentials: "include",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email,
                phoneNumber,
                firstName: name.split(" ")[0],
                lastName: name.split(" ").slice(1).join(" "),
                uuid: user?.uuid
            })
        }).then(res => res.json())
        .then(data => {
            console.log(data);
            getCurrentUser();
            setDisabled(true);
            return data;
        });
        return data;
    };

    const cancelChanges = () => {
        setName(user?.firstName + " " + user?.lastName);
        setEmail(user?.email);
        setPhoneNumber(user?.phoneNumber);
    };

    return(
        <Div backgroundColor={`${theme.background}`} padding="0px 10px">
            <h1 style={{ color: theme.textColor }}>Personal Info</h1>
            <Div padding={0}>
                <SettingsInput title="Name" value={`${name}`} onChange={(e) => setName(e.target.value)} />
                <SettingsInput title="Email" value={`${email}`} onChange={(e) => setEmail(e.target.value)} />
                <SettingsInput title="Phone Number" value={`${phoneNumber === null ? "No Phone Number" : phoneNumber.replace(/^(\d{3})(\d{3})(\d{4})/, '$1-$2-$3')}`} onChange={(e) => setPhoneNumber(e.target.value)} disabled={phoneNumber === null ? true : false} />
            </Div>
            <Div style={{ flex: 1 }} />
            <Div padding={0}>
                <Button onClick={() => cancelChanges()} backgroundColor="transparent" border={`2px solid ${theme.accentColor}`} marginRight={"5px"} disabled={disabled}>
                    Cancel
                </Button>
                <Button  border={`2px solid ${theme.accentColor}`} onClick={() => updateUser()} disabled={disabled}>
                    Save Changes
                </Button>
            </Div>
        </Div>
    );
};

export default Personal;