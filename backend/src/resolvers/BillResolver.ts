import { prisma } from "../../lib/prisma";
import { Bill } from "@prisma/client";

interface AddBillDataInterface extends Omit<Bill, "id" | "ownerId" | "paid"> {}
interface PaidStatusInterface extends Pick<Bill, "id" | "ownerId" | "paid"> {}
interface DeleteBillInterface extends Pick<Bill, "id" | "ownerId">{}

export async function AddBill(data: AddBillDataInterface, uuid): Promise<Bill> {
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
            },
            include: {
                bills: {
                    orderBy: {
                        id: 'desc'
                    },
                    take: 1
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

export async function UpdateBill(data: Bill, uuid): Promise<Bill | boolean> {
    try {
        if(uuid != data.ownerId) return false;
        let bill = await prisma.bill.update({
            where: {
                id: data.id
            },
            data: {
                name: data.name,
                amount: data.amount,
                frequency: data.frequency,
                due_date: data.due_date,
                category: data.category,
                paid: data.paid,
            }
        }).then(v => {
            console.log("updated user bill");
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

export async function UpdatePaidStatus(data: PaidStatusInterface, uuid) {
    try {
        if(uuid != data.ownerId) return false;
        let paid = await prisma.bill.update({
            where: {
                id: data.id
            }, data: {
                paid: data.paid
            }
        }).then(v => {
            console.log("update bill paid status");
            return v;
        }).catch(e => {
            console.log("error", e);
        });
        return paid;
    } catch(e) {
        console.log(e);
        return;
    }
};

export async function DeleteBill(data: DeleteBillInterface, uuid): Promise<boolean> {
    try {
        if(uuid != data.ownerId) return false;
        let deleteBill = await prisma.bill.delete({
            where: {
                id: data.id
            }
        }).then(v => {
            console.log("delete bill status", v);
            return true;
        }).catch(e => {
            console.log("error", e);
            return false;
        });
        return deleteBill;
    } catch(e) {
        console.log(e);
        return false;
    }
}