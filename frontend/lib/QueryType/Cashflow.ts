export interface CreateBillInterface {
    name: string,
    amount: number,
    frequency: string,
    due_date: Date,
    category: string
}

export interface BillsInterface extends CreateBillInterface {
    paid: boolean,
    id: number,
    ownerId: string
}