import { User } from "@prisma/client";
import { prisma } from "../../lib/prisma";
import { Request } from "express";

export async function UpdateUser(req: Request): Promise<User> {
    try {
        let user = await prisma.user.update({
            where: {
                uuid: req.body.uuid
            },
            data: {
                firstName: req.body.firstName || undefined,
                lastName: req.body.lastName || undefined,
                email: req.body.email || undefined,
                phoneNumber: req.body.phoneNumber || undefined
            }
        });
        return user;
    } catch(e) { 
        console.log(e);
        return e;
    }
};