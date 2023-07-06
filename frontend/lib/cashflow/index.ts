import { BillsInterface, CreateBillInterface } from "lib/QueryType/Cashflow"

export const createBill = async(data: CreateBillInterface, uuid) => {
    const createBillResponse = await fetch(`${process.env.API_DOMAIN}/user/create/bill`, {
        method: "POST",
        credentials: "include",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            name: data.name,
            amount: data.amount,
            frequency: data.frequency,
            due_date: new Date(data.due_date),
            category: data.category,
            uuid
        })
    });

    return createBillResponse;
};

export const updateBill = async(data: BillsInterface, uuid) => {
    const updateBillResponse = await fetch(`${process.env.API_DOMAIN}/user/update/bill`, {
        method: "POST",
        credentials: "include",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            name: data.name,
            amount: data.amount,
            frequency: data.frequency,
            due_date: data.due_date,
            category: data.category,
            paid: data.paid,
            id: data.id,
            ownerId: data.ownerId,
            uuid
        })
    });

    return updateBillResponse;
};

export const getBills = async(uuid) => {
    const getBillResponse = await fetch(`${process.env.API_DOMAIN}`, {
        method: "POST",
        credentials: "include",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            uuid
        })
    });
    return getBillResponse;
};