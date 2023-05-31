import { User } from "@prisma/client";
import { Request, Response } from "express";
import { verifySessionToken } from "../auth/session";

export interface MyContext {
    req: Request;
    res: Response;
    token: string | null;
    currentUser: User | null;
};

const context = async ({
    req,
    res,
    token,
    currentUser
}: MyContext): Promise<MyContext> => {
    try {
        token = req.cookies["everypenny-session"] || req.headers["authorization"] || null;

        if(token) {
            const user = await verifySessionToken(token);

            if(user) {
                currentUser = user.user;
            }
        } else {
            currentUser = null;
            token = null;
        }
    } catch(e) {
        console.log(e);
    }

    return {
        currentUser,
        token,
        req,
        res
    }
};

export default context;