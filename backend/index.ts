import csrf from "csurf";
import express from "express";
import bodyParser from "body-parser";
import "./lib/firebase";
import { v4 } from "uuid";
import cookieParser from "cookie-parser";
import cors from "cors";

import { getAuth } from "firebase-admin/auth";

//queries
import { createUser, getUser, deleteUser } from "./queries/auth";

const app = express();

var csrfProtection = csrf({ cookie: true });
var parseForm = bodyParser.urlencoded({ extended: false });

app.use(bodyParser.json());
app.use(cookieParser());

app.use(cors({
    credentials: true,
    origin: "http://localhost:3000",
}));

let uuid = v4();

app.get('/', csrfProtection, (req, res) => {
    //@ts-ignore
    res.status(200).send({ csrfToken: req.csrfToken() })
});

app.post('/auth/create', async(req, res) => {
    const id = uuid;
    let user = await createUser({
        uuid: id,
        email: req.body.email,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        password: req.body.password
    });

    // await getAuth().createSessionCookie(user.uuid, { expiresIn }).then((sessionCookie) => {
    //     const options = { maxAge: expiresIn, httpOnly: true, secure: true };
    //     res.cookie('session', sessionCookie, options);
    //     res.send({ success: true, data: user })
    // }, (error) => { res.status(401).send(`UNAUTHORIZED REQUEST ${error}`)});
    res.send({ success: true, data: user });
});

app.get("/auth/user/:uuid", async(req, res) => {
    let user = await getUser({
        uuid: req.params.uuid
    });

    res.send({ success: true, data: user});
});

app.post("/user/delete/:uuid", async(req, res) => {
    let user = await deleteUser({
        uuid: req.params.uuid
    });

    res.send({ success: true, userDeleted: user});
});

//create session
app.post("/auth/login", parseForm, csrfProtection, async(req, res) => {
    const expiresIn = 60 * 60 * 24 * 5 * 1000;
    console.log(req.cookies, req.headers)
    await getAuth().createSessionCookie(req.body.idToken, { expiresIn }).then((sessionCookie) => {
        const options = { maxAge: expiresIn, httpOnly: true, secure: true };
        res.cookie('session', sessionCookie, options);
        console.log(`nom nom nom cookie  ${req.body.idToken}`)
        res.send({ idToken: req.body.idToken, cookie: `cookie... ${sessionCookie}` })
    }, (error) => { res.status(401).send(`UNAUTHORIZED REQUEST ${error}`)});
});

app.listen(4000, () => {
    console.log("express has started the api connection...");
});