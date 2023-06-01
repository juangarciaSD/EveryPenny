import AppContext from "lib/AppContext";
import React from "react";
import { PlaidLinkOnSuccess, PlaidLinkOnSuccessMetadata } from "react-plaid-link";

//public_token - displayed once a user has successfully linked their item.

const Link = async() => {
    const { user } = React.useContext(AppContext);

    const [public_token, setPublicToken] = React.useState(null);

    const getLinkToken = await fetch(`${process.env.API_DOMAIN}/plaid/create_link_token`, {
        method: "POST",
        credentials: "include",
        body: JSON.stringify({
            uuid: user.uid
        })
    }).then(res => res.json()).then(data => setPublicToken(data.data.link_token))

    const onSuccess = React.useCallback<PlaidLinkOnSuccess>
        ((public_token: string, metadata: PlaidLinkOnSuccessMetadata) => {
            //fetch link token also known as public_token
            
        }, [])
    return(
        
    );
};