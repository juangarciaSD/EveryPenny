import { prisma } from "../../lib/prisma";
import { Bill } from "@prisma/client";

interface BillDataInterface extends Omit<Bill, "id" | "ownerId" | "paid"> {}

export async function AddBill(data: BillDataInterface, uuid): Promise<Bill> {
    try {
        let bill = await prisma.user.update({
            where: {
                uuid
            },
            data: {
                bills: {
                    create: {
                        name: data.name,
                        amount: data.amount,
                        frequency: data.frequency || "OneTimeOnly",
                        due_date: data.due_date,
                        category: data.category || "Other"
                    }
                }
            }
        }).then(v => {
            console.log("saved user bills data");
            return v;
        }).catch(e => {
            console.log("error", e);
            return e;
        });
        return bill;
    } catch(e) {
        console.log(e);
        return e;
    }
};