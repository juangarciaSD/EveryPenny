import AppContext from "lib/AppContext";
import React from "react";
import { usePlaidLink } from "react-plaid-link";
import { Context } from "lib/PlaidContext";
import Button from "../Button/DefButton";

// //public_token - displayed once a user has successfully linked their item.

const Link = () => {
    const context = React.useContext(Context);

    let token = localStorage.getItem("link_token");
    const onSuccess = React.useCallback((public_token, metadata) => {
        console.log("token before exchange", token)
        const handleExchange = async() => {
            const response = await fetch(`${process.env.API_DOMAIN}/plaid/exchange_token`, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    public_token: token
                })
            });
            console.log("ran response", response);
            if(!response.ok) {
                context.dispatch({
                    type: "SET_STATE",
                    state: {
                        itemId: 'no item_id provided',
                        accessToken: 'no access_token provided',
                        isItemAccess: false
                    }
                });
                return;
            }

            const data = response.json();
            context.dispatch({
                type: "SET_STATE",
                state: {
                    itemId: (await data).item_id,
                    accessToken: (await data).access_token,
                    isItemAccess: true
                }
            });
        }

        if(context.isPaymentInitiation) {
            context.dispatch({ type: "SET_STATE", state: { isItemAccess: false } });
        } else {
            console.log("hello")
            handleExchange();
        }

        context.dispatch({ type: "SET_STATE", state: { linkSuccess: true }});
        window.history.pushState("", "", "/")
    }, [context.dispatch]);

    const onExit = (err, metadata) => {
        console.log(err, metadata)
    };

    let isOauth = false;
    const config: Parameters<typeof usePlaidLink>[0] = {
        token,
        onSuccess,
        onExit
    };

    if(window.location.href.includes("?oauth_state_id=")) {
        config.receivedRedirectUri = window.location.href;
        isOauth = true;
    };
    
    const { open, exit, ready } = usePlaidLink(config);


    React.useEffect(() => {
        if(isOauth && ready) {
            open();
        }
    }, [ready])
    return(
        <button onClick={() => open()} type="button">
            Open Link
        </button>
    )
};

export default Link;
// const Link = () => {
//     const { linkToken, isPaymentInitiation, dispatch } = React.useContext(Context);
//     const { user } = React.useContext(AppContext);

//     const [public_token, setPublicToken] = React.useState(null);

//     interface PublicTokenInterface {
//         item_id: string,
//         access_token: string
//     }

//     const onSuccess = React.useCallback
//         ((public_token: string) => {
//             //fetch link token also known as public_token
//             const exchangePublicTokenForAccessToken = async(): Promise<PublicTokenInterface> => {
//                 const response = await fetch(`${process.env.API_DOMAIN}/plaid/exchange-token`, {
//                     method: "POST",
//                     headers: {
//                         'Content-Type': 'application/json'
//                     },
//                     body: JSON.stringify({
//                         public_token
//                     })
//                 });
//                 if(!response.ok) {
//                     dispatch({
//                         type: "SET_STATE",
//                         state: {
//                             itemId: 'no item_id retrieved',
//                             accessToken: 'no access_token retrieved',
//                             isItemAccess: false
//                         }
//                     });
//                     return;
//                 }
//                 const data: Promise<PublicTokenInterface> = response.json();
//                 dispatch({
//                     type: "SET_STATE",
//                     state: {
//                         itemId: (await data).item_id,
//                         accessToken: (await data).access_token,
//                         isItemAccess: true,
//                     },
//                 });

//                 // 'payment_initiation' products do not require the public_token to be exchanged for an access_token.
//                 if (isPaymentInitiation){
//                     dispatch({ type: "SET_STATE", state: { isItemAccess: false } });
//                 } else {
//                     exchangePublicTokenForAccessToken();
//                 }

//                 dispatch({ type: "SET_STATE", state: { linkSuccess: true } });
//                 window.history.pushState("", "", "/");
//             };
//         }, [dispatch]);

//         let isOauth = false;
//         const config: Parameters<typeof usePlaidLink>[0] = {
//             token: linkToken!,
//             onSuccess
//         };

//         if (window.location.href.includes("?oauth_state_id=")) {
//             // TODO: figure out how to delete this ts-ignore
//             config.receivedRedirectUri = window.location.href;
//             isOauth = true;
//           }
        
//           const { open, ready } = usePlaidLink(config);

//           React.useEffect(() => {
//             if(isOauth && ready) {
//                 open();
//             }
//           }, [ready, open, isOauth]);
//     return(
//       <>
//         <Button type="button" onClick={() => open("link-sandbox-509100f7-ec0e-447f-a65d-9c499fd13cff")}>
//             Launch Link
//         </Button>
//       </>  
//     );
// };

// export default Link;
