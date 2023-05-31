import { User } from "@prisma/client";
import { prisma } from "../../lib/prisma";
import { getAuth } from "firebase-admin/auth"

interface UserInput {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    uuid: string;
}

export const createUser = async(data: UserInput): Promise<User> => {
    let user = await prisma.user.create({
        data: {
            email: data.email,
            firstName: data.firstName,
            lastName: data.lastName,
            uuid: data.uuid,
        }
    }).then(async(user) => {
        var firebaseUser = await getAuth().createUser({
            email: user.email,
            password: data.password,
            displayName: `${data.firstName} ${data.lastName}`,
            uid: data.uuid
        }).catch(e => {
            new Error("There was an error while trying to create user account.")
            console.log("firebase error", e)
        });

        return user
    }).catch(e => {
        new Error("There was an error while trying to create user data.")
        return e;
    });

    return user;
};

export const getUser = async(data: Partial<UserInput>): Promise<User> => {
    let user = await prisma.user.findFirst({
        where: {
            uuid: data.uuid,
            email: data.email
        },
        include: {
            accounts: true
        }
    }).then(v => {
        console.log(`got user with data of`, v);
        return v;
    }).catch(e => {
        new Error(`There was an error while trying to get user with provided data ${e}`);
        return e;
    });

    return user;
};

export const deleteUser = async(data: Partial<UserInput>): Promise<Boolean> => {
    let user = await prisma.user.delete({
        where: {
            uuid: data.uuid
        }
    });
    if(user) return true;
    return false;
}