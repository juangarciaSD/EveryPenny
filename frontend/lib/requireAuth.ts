import { NextPage, NextPageContext } from "next";
import Router from "next/router";
import { getCurrentUser } from "./auth";

//list of paths that doesn't require authenticated user
const nonAuthLinks = ["/auth"]

const requireAuth = (page: NextPage) => {
    const originalGetInitialProps = page.getInitialProps;
    page.getInitialProps = async(ctx: NextPageContext) => {
        const user = await getCurrentUser();
        if(!user && !nonAuthLinks.includes(Router.pathname)) {
            const loginUrl = "/auth";
            await Router.push(loginUrl);
        }
    }
};

export default requireAuth;