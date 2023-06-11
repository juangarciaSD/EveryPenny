import React from "react";
import NavBar from "components/NavBar"
import Button from "../Button/DefButton";
import { User } from "lib/QueryType/User";
import AppContext from "lib/AppContext";
import Link from "components/Plaid/Link"
import Div from "../Div/DefDiv";
import requireAuth from "lib/requireAuth";

const Dashboard = () => {
    const context = React.useContext(AppContext);

    React.useEffect(() => {
        console.log(context?.user)
    }, [context?.user]);

    const getLinkToken = async() => {
        await fetch(`${process.env.API_DOMAIN}/plaid/create_link_token`, {
            method: "POST",
            credentials: "include",
            headers: {
                "Access-Control-Allow-Origin": "http://localhost:3000",
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                uuid: context?.user.uuid
            })
        }).then(res => res.json()).then(data => {
            localStorage.setItem("link_token", data.data.link_token);
            console.log(data.data.link_token)
        }).catch(e => {
            console.log("error while trying to create link_token", e);
        });
    }
    return(
        <>
        <NavBar />
        <Div>
            
        </Div>
        <h1>Hello World</h1>
        <Button onClick={() => getLinkToken()}>
            Link Account
        </Button>
        <Link />
        </>
    );
};

requireAuth(Dashboard)

export default Dashboard;