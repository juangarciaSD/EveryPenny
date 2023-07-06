export interface User {
    email: string;
    firstName: string;
    lastName: string;
    phoneNumber?: string;
    uuid: string;
    accounts: Array<Account>
    bills: Array<Bills>
}

interface Account {
    accountId: string;
    currencyCode: number;
    currentBalance: number;
    id: number;
    name: string;
    ownerId: User["uuid"];
    subtype: "checking";
    type: "depository"
};

export interface Bills {
    amount: number;
    category: string;
    due_date: Date;
    frequency: string;
    id: number;
    name: string;
    ownerId: string;
    paid: boolean;
}