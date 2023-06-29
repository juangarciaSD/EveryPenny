import express from "express";
import bodyParser from "body-parser";
import "./lib/firebase";
import { v4 } from "uuid";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import { client } from "./lib/plaid";
import { CountryCode, Products, TransactionsGetRequest } from "plaid";

dotenv.config();

//queries
import { createUser, getUser, deleteUser } from "./src/auth";
import { UserLogin, GetMe } from "./src/resolvers/AuthenticationResolver";
import { UpdateUser } from "./src/resolvers/UserResolver";
import { PlaidDataResponse } from "./lib/plaid.interface";
import { AddAccount } from "./src/resolvers/AccountResolver";
import { AddBill } from "./src/resolvers/BillResolver";

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());

app.use(cors({
    credentials: true,
    origin: "http://localhost:3000",
}));

app.get('/', async(_req, res) => {
    //@ts-ignore
    res.send({ data: "hello world" });
});

//pull current user
app.get('/user/current', async(req, res) => {
    let token = req.cookies["everypenny-session"] || req.headers["authorization"] || null;
    let user = await GetMe(token);
    res.send({ success: true, user });
});

//create user
app.post('/auth/create', async(req, res) => {
    let createdUser = await createUser({
        uuid: req.body.uuid,
        email: req.body.email,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        phoneNumber: req.body.phoneNumber
    });
    console.log(createdUser)
    //login user after creating account on db
    let user = await UserLogin(res, req.body.idToken);
    res.send({ success: true, data: user });
});

//create session
app.post("/auth/login", async(req, res) => {
    let user = await UserLogin(res, req.body.idToken);
    res.send({ success: true, data: user })
});

//find user with uuid
app.get("/auth/user/:uuid", async(req, res) => {
    let user = await getUser({
        uuid: req.params.uuid
    });

    res.send({ success: true, data: user, cookie: req.cookies });
});

app.put("/user/update", async(req, res) => {
    await UpdateUser(req);
    res.send({ success: true })
});

//signout user
app.get("/auth/signout", async(_req, res) => {
    res.clearCookie("everypenny-session", {
        httpOnly: true,
        expires: new Date(Date.now() + 60 * 60 * 1000 * 24)
    });
    res.send({ success: true });
});

//delete user account
app.post("/user/delete/:uuid", async(req, res) => {
    let user = await deleteUser({
        uuid: req.params.uuid
    });

    res.send({ success: true, userDeleted: user});
});

//create plaid link token
app.post('/plaid/create_link_token', async(req, res) => {
    const configs = {
        user: {
            client_user_id: req.body.uuid
        },
        client_name: 'EveryPenny',
        products: ["auth", "transactions"] as Array<Products>,
        country_codes: ["US"] as Array<CountryCode>,
        language: "en",
    };

    const createTokenResponse = await client.linkTokenCreate(configs).then(data => {return data}).catch(e => { console.log(e); return e});
    res.send({ success: true, data: createTokenResponse.data })
});

app.post('/plaid/exchange_token', async(req, res) => {
    const { data } = await client.itemPublicTokenExchange({
        public_token: req.body.public_token
    });

    const authResponse = await client.authGet({ access_token: data.access_token });
    const account = authResponse.data.accounts[0];
    const numbers =  authResponse.data.numbers.ach[0];
    //build data before saving to database
    let responseData: PlaidDataResponse = {
        accounts: {
            account_id: account.account_id,
            balances:  {
                available: account.balances.available,
                current: account.balances.current
            },
            name: account.name,
            official_name: account.official_name,
            subtype: account.subtype,
            type: account.type
        },
        numbers: {
            ach: {
                account: numbers.account,
                routing: numbers.routing
            }
        }
    };
    let addAccountResponse = await AddAccount(responseData, req.body.uuid);
    res.send({ success: true, data: addAccountResponse[0] });
});

//bills
app.post('/user/create/bill', async(req, res) => {
    const billResponse = await AddBill({
        name: req.body.name,
        amount: req.body.amount,
        frequency: req.body.frequency,
        due_date: req.body.due_date,
        category: req.body.category
    }, req.body.uuid);

    res.send({ success: true, data: billResponse})
});

app.listen(4000, () => {
    console.log("express has started the api connection...");
});