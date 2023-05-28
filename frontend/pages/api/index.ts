import { NextRequest, NextResponse } from "next/server";

export default function handler(req: NextRequest, res: NextResponse) {
    return fetch(process.env.API_DOMAIN + "/", {
        method: "GET"
    })
};