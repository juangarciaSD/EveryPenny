import { prisma } from "../../lib/prisma";
import { PlaidDataResponse } from "../../lib/plaid.interface";
import { Account, User } from "@prisma/client";

export async function AddAccount(data: PlaidDataResponse, uuid): Promise<Account[]> {
    try {
        let account: Account[] = await prisma.user.update({
            where: {
                uuid
            },
            data: {
                accounts: {
                    create: {
                        currentBalance: data.accounts.balances.current,
                        name: data.accounts.name,
                        subtype: data.accounts.subtype,
                        type: data.accounts.type,
                        currencyCode: 0,
                        accountId: data.accounts.account_id
                    }
                }
            },
            include: {
                accounts: true
            }
        }).then(v => {
            console.log("saved user data");
            return v.accounts;
        }).catch(e => {
            console.log("error", e)
            return e
        });
        return account;
    } catch(e) {
        console.log(e);
        return e;
    }
}