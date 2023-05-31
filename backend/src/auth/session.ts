import { Response } from "express";
import admin from "firebase-admin";
import { MyContext } from "../types/MyContext";
import { CookieExpiresInMs } from "../constants";
import { User } from "@prisma/client"
import { prisma } from "../../lib/prisma";

type ReturnType = {
    firebaseUser: admin.auth.UserRecord | null;
    user: User | null
}

export async function setSessionCookies(
    res: Response,
    token: string
) {
    //check token if valid
    const user = await verifyToken(token);

    //require sign in due to no user
    if(!user?.user) {
        return null;
    };

    //if good token then create user session
    const customToken = await admin.auth().createSessionCookie(token, { expiresIn: CookieExpiresInMs })
    .catch(e => {
        console.error(e);
        return null;
    });
    
    //if no token was returned then throw error
    if(!customToken) {
        throw new Error("Could not create the token");
    }

    //set user cookie
    res.cookie("everypenny-session", customToken, {
        httpOnly: true,
        expires: new Date(Date.now() + CookieExpiresInMs)
    });

    //return user info
    return user;
};

export async function verifyToken(token: string): Promise<ReturnType | null> {
    try {
        const decoded = await admin.auth().verifyIdToken(token)
        .catch(e => {
            console.log(e);

            return Promise.resolve({ user: null, firebaseUser: null });
        });

        if("uid" in decoded) {
            const firebaseUser = await admin.auth().getUser(decoded.uid);
            let user = await prisma.user.findFirst({
                where: {
                    email: firebaseUser.email
                }
            });

            return {
                user,
                firebaseUser
            };
        } else {
            return Promise.resolve({ user: null, firebaseUser: null });
        }
    } catch(e) {
        console.log(e);
        return Promise.resolve({ user: null, firebaseUser: null });
    }
};

export async function verifySessionToken(
    cookie: string
): Promise<ReturnType | null> {
    const decoded = await admin.auth().verifySessionCookie(cookie, true);

    if(!decoded) {
        return Promise.resolve({ user: null, firebaseUser: null });
    };

    const firebaseUser = await admin.auth().getUser(decoded.uid);
    const user = await prisma.user.findFirst({
        where: {
            email: firebaseUser.email
        }
    });

    if(!user) {
        return Promise.resolve({ user: null, firebaseUser: null });
    };

    return {
        user, 
        firebaseUser
    }
};

export function clearUserCookies(ctx: MyContext): MyContext {
    ctx.res.clearCookie("everypenny-session", {
        httpOnly: true,
        expires: new Date(Date.now() + 60 * 60 * 1000 * 24)
    });

    ctx.token = null;
    ctx.currentUser = null;

    return ctx;
}