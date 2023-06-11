import express from "express";
import bodyParser from "body-parser";
import "./lib/firebase";
import { v4 } from "uuid";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import { client } from "./lib/plaid";
import { CountryCode, Products } from "plaid";

dotenv.config();

//queries
import { createUser, getUser, deleteUser } from "./src/auth";
import { EmailLogin, GetMe } from "./src/resolvers/AuthenticationResolver";

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());

app.use(cors({
    credentials: true,
    origin: "http://localhost:3000",
}));

let uuid = v4();

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
    const id = uuid;
    let user = await createUser({
        uuid: id,
        email: req.body.email,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        password: req.body.password
    });
    console.log(user)
    // await getAuth().createSessionCookie(user.uuid, { expiresIn }).then((sessionCookie) => {
    //     const options = { maxAge: expiresIn, httpOnly: true, secure: true };
    //     res.cookie('session', sessionCookie, options);
    //     res.send({ success: true, data: user })
    // }, (error) => { res.status(401).send(`UNAUTHORIZED REQUEST ${error}`)});
    res.send({ success: true, data: user });
});

//find user with uuid
app.get("/auth/user/:uuid", async(req, res) => {
    let user = await getUser({
        uuid: req.params.uuid
    });

    res.send({ success: true, data: user, cookie: req.cookies });
});

//create session
app.post("/auth/login", async(req, res) => {
    let user = await EmailLogin(res, req.body.idToken);
    res.send({ success: true, data: user })
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
        products: ["auth", "identity", "transactions"] as Array<Products>,
        country_codes: ["US", "CA"] as Array<CountryCode>,
        language: "en"
    };

    const createTokenResponse = await client.linkTokenCreate(configs);
    res.send({ success: true, data: createTokenResponse.data })
});

app.post('/plaid/exchange_token', async(req, res) => {
    let public_token = req.body.public_token;
    console.log("public token where", public_token);
    const { data } = await client.itemPublicTokenExchange({
        public_token
    });

    const authResponse = await client.authGet({ access_token: data.access_token });
    console.log(data.access_token, data.item_id, authResponse);
    res.send({ success: true, data: authResponse.data });
});


app.listen(4000, () => {
    console.log("express has started the api connection...");
});