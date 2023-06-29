export interface User {
    email: string;
    firstName: string;
    lastName: string;
    phoneNumber: string;
    uuid: string;
    accounts: Array<Account>
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