import express from "express";
import bodyParser from "body-parser";
import "./lib/firebase";
import { v4 } from "uuid";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv"

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

app.get('/user/current', async(req, res) => {
    let token = req.cookies["everypenny-session"] || req.headers["authorization"] || null;
    let user = await GetMe(token);
    res.send({ success: true, user });
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

    res.send({ success: true, data: user, cookie: req.cookies });
});

app.post("/user/delete/:uuid", async(req, res) => {
    let user = await deleteUser({
        uuid: req.params.uuid
    });

    res.send({ success: true, userDeleted: user});
});

//create session
app.post("/auth/login", async(req, res) => {
    let user = await EmailLogin(res, req.body.idToken);
    res.send({ success: true, data: user })
});

app.get("/auth/signout", async(_req, res) => {
    res.clearCookie("everypenny-session", {
        httpOnly: true,
        expires: new Date(Date.now() + 60 * 60 * 1000 * 24)
    });
    res.send({ success: true });
});

app.listen(4000, () => {
    console.log("express has started the api connection...");
});