import { User } from "@prisma/client";
import { setSessionCookies, verifySessionToken } from "../auth/session";
import { Response } from "express";

export async function GetMe(token: string): Promise<User | null> {
    try {
        if(token) {
            let user = await verifySessionToken(token);

            if(user) {
                console.log("user found", user.user);
                return user.user;
            } else {
                return null;
            }
        }
    } catch(e) {
        console.log(e);
        return e;
    }

    return null;
};

export async function UserLogin(
    res: Response,
    idToken: string
): Promise<User> {
    const user = await setSessionCookies(res, idToken);

    if(!user?.user) {
        throw new Error("An error occurred when creating the session.");
    };

    return user.user;
};