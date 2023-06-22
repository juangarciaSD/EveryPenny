import { clearSession } from "lib/auth";
import React, { Suspense } from "react";
import Button from "ui/components/Button"
import AppContext from "lib/AppContext"
import { useRouter } from "next/router";
import Dashboard from "ui/components/Screen/dashboard";
import { useTheme } from "styled-components";
import Loading from "./loading";


const Index = () => {
    const theme = useTheme();
    const router = useRouter();

    const { user, firebaseUser } = React.useContext(AppContext);
    
    React.useEffect(() => {
        if(!user || !user && !firebaseUser) router.push('/auth');
    }, [user, firebaseUser])

    if(user) {
        return(
            <div style={{ backgroundColor: theme.background, height: "100vh" }}>
                <Suspense fallback={<Loading />}>
                    <Dashboard />
                </Suspense>
            </div>
        )
    } else {
        return <h1>Hello World</h1>
    }
};

export default Index;