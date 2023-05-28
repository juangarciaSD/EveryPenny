import firebaseAdmin from "firebase-admin"
import { initializeApp } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth"
import dotenv from "dotenv";
import * as serviceAccount from "../easypenny-firebase-sdk.json";

dotenv.config();

export const defaultApp = initializeApp({
    credential: firebaseAdmin.credential.cert(JSON.parse(JSON.stringify(serviceAccount)))
});

export let defaultAuth = getAuth(defaultApp)