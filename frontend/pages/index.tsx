import { clearSession } from "lib/auth";
import React from "react";
import Button from "ui/components/Button"
import AppContext from "lib/AppContext"
import { useRouter } from "next/router";
import Dashboard from "ui/components/Screen/dashboard";


const Index = () => {
    const router = useRouter();

    const { user, firebaseUser } = React.useContext(AppContext);
    
    React.useEffect(() => {
        if(!user || !user && !firebaseUser) router.push('/auth');
        console.log(user, firebaseUser?.email)
    }, [user, firebaseUser])

    if(user) {
        return <Dashboard />
    } else {
        return <h1>Hello World</h1>
    }
};

export default Index;