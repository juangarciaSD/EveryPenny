export interface PlaidDataResponse {
    accounts: {
        account_id: string,
        balances: {
            available: number | null,
            current: number | null,
        },
        name: string,
        official_name: string | null,
        subtype: string | null,
        type: string
    },
    numbers: {
        ach: {
            account: string,
            routing: string
        }
    }
}