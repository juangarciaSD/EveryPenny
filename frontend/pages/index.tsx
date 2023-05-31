import { clearSession } from "lib/auth";
import React from "react";
import Button from "ui/components/Button"
import AppContext from "lib/AppContext"
import { useRouter } from "next/router";


const Index = () => {
    const router = useRouter();

    const { user, firebaseUser } = React.useContext(AppContext);
    
    React.useEffect(() => {
        if(!user || !user && !firebaseUser) router.push('/auth')
    }, [user])

    const signOut = () => {
        clearSession();
    };
    return(
        <>
            <h1>Hello, Next.JS!</h1>
            <Button onClick={signOut}>Hello?asdfasdfasdf</Button>
        </>
    )
};

export default Index;