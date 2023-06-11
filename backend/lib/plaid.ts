import dotenv from "dotenv";
import { Configuration, PlaidApi, PlaidEnvironments } from "plaid";

dotenv.config();

console.log({
    'client_id': process.env.PLAID_CLIENT_ID,
    'PLAID-SECRET': process.env.PLAID_DEVELOPMENT_KEY,
})

const config = new Configuration({
    basePath: PlaidEnvironments[process.env.PLAID_ENV as string],
    baseOptions: {
        headers: {
            'PLAID-CLIENT-ID': process.env.PLAID_CLIENT_ID,
            'PLAID-SECRET': process.env.PLAID_DEVELOPMENT_KEY,
            'Plaid-Version': '2020-09-14',
        }
    },
});

export const client = new PlaidApi(config);