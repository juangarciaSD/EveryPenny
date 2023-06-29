import React from "react";
import NavBar from "components/NavBar"
import Button from "../Button/DefButton";
import AppContext from "lib/AppContext";
import Div from "../Div/DefDiv";
import { LineChart, Line, CartesianGrid, XAxis, YAxis, ResponsiveContainer } from "recharts";
import { usePlaidLink, PlaidLinkOptions } from "react-plaid-link";
import { User } from "lib/QueryType/User";

const Dashboard = () => {
    const context = React.useContext(AppContext);

    const [user, _] = React.useState<User>(context?.user);
    const [plaidToken, setPlaidToken] = React.useState<string>("");

    const data = [{
        name: "Mar '23",
        uv: 400,
        pv: 2400,
        amt: 2400
    },
    {
        name: "Apr '23",
        uv: 3000,
        pv: 1398,
        amt: 2210,
      },
      {
        name: "May '23",
        uv: 2000,
        pv: 9800,
        amt: 2290,
      },
      {
        name: "Jun '23",
        uv: 2780,
        pv: 3908,
        amt: 2000,
      },
      {
        name: "Jul '23",
        uv: 1890,
        pv: 4800,
        amt: 2181,
      },
      {
        name: 'Page F',
        uv: 2390,
        pv: 3800,
        amt: 2500,
      },]

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
        }).catch(e => {
            console.log("error while trying to create link_token", e);
            return e;
        });
        let token = localStorage.getItem("link_token")
        setPlaidToken(token);
    };

    //plaid setup and linking process
    const onSuccess = React.useCallback((public_token, metadata) => {
        fetch(`${process.env.API_DOMAIN}/plaid/exchange_token`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                public_token,
                uuid: context?.user.uuid
            })
        }).then(data => data.json())
        .then(data => {
            console.log("success data", data);
            return data;
        }).catch(e => {
            console.log("error while exchanging token");
            return e;
        });
    }, []);

    const onExit = (err, metadata) => {
        console.log("plaid exit error", err);
        console.log("plaid exit metadata", metadata);
    };

    const config: PlaidLinkOptions = {
        token: plaidToken,
        onSuccess,
        onExit
    };

    const { open, ready: plaidReady } = usePlaidLink(config);

    React.useEffect(() => {
        if(localStorage.getItem("link_token") === null || !plaidReady) getLinkToken();
    }, [])
    return(
        <>
        <NavBar />
        <Div display="flex" flexDirection="column" justifyContent="center" padding={0}>
            <Div width={"65%"} margin={"auto"} padding={0} marginTop={"15px"} display="flex" flexDirection="row" justifyContent="space-between">
                <h2 style={{ margin: 0 }}>Hello, {user.firstName + " " + user.lastName}</h2>
                <Button width={"10%"} marginRight={"0px"} onClick={() => open()}>Link/Add</Button>
            </Div>
            <Div backgroundColor="#fff" width={"65%"}  margin="auto" marginTop={"15px"} padding={"25px"}>
            <ResponsiveContainer width={"100%"} height={325}>
                <LineChart style={{ margin: "auto" }} data={data}>
                    <Line type="monotone" dataKey={"uv"} stroke="#8884d8" />
                    <CartesianGrid stroke="#ccc" />
                    <XAxis dataKey="name" />
                    <YAxis dataKey={"pv"} />
                </LineChart>
            </ResponsiveContainer>
            </Div>
            <Div width={"65%"} margin={"auto"} marginTop={"15px"} display="flex" justifyContent="space-between">
                <Div width={"32.5%"} height="100px" backgroundColor="#fff">
                    <h2 style={{ color: "#000", margin: "5px" }}>Net Worth</h2>
                    <span style={{ color: "green", margin: "5px", fontSize: "35px" }}>$18,429.20</span>
                </Div>
                <Div width={"32.5%"} height="100px" backgroundColor="#fff">
                    <h2 style={{ color: "#000", margin: "5px" }}>Liabilities</h2>
                    <span style={{ color: "green", margin: "5px", fontSize: "35px" }}>${user?.accounts[0].currentBalance}</span>
                </Div>
                <Div width={"32.5%"} height="100px" backgroundColor="#fff">
                    <h2 style={{ color: "#000", margin: "5px" }}>Assets</h2>
                    <span style={{ color: "green", margin: "5px", fontSize: "35px" }}>$18,429.20</span>
                </Div>
            </Div>
        </Div>
        </>
    );
};

export default Dashboard;