import React from "react";
import { NextPage } from "next";
import { AppProps } from "next/app";
import { ThemeProvider } from "styled-components";
import { DarkTheme, LightTheme } from "lib/ThemeProvider";
import { AppProvider, ThemeColors } from "lib/AppContext";
import { User as FirebaseUser, getAuth, onAuthStateChanged as firebaseAuthStateChanged } from "firebase/auth";
import { User } from "lib/QueryType/User"
import { useRouter } from "next/router";
import { clearSession, getCurrentUser } from "lib/auth";
import { cookies } from "next/dist/client/components/headers";
import Loading from "./loading";

const pages = ["/404", "/auth", "/auth/create", "/auth/forgot", "/tos"];

const AppContainer: NextPage<AppProps> = ({ Component, pageProps }) => {
    const [isLoading, setLoading] = React.useState<boolean>(true);

    const [firebaseUser, setFirebaseUser] = React.useState<FirebaseUser | null>(null);
    const [currentTheme, setCurrentTheme] = React.useState<ThemeColors>("dark");

    //TODO: create user type and link to useState type
    const [currentUser, setCurrentUser] = React.useState<Partial<User> | null>(null);
    const [authorized, setAuthorized] = React.useState<boolean>(false);

    const { pathname, push, ...router } = useRouter();

    

    const onAuthStateChanged = React.useCallback(
        async(user: FirebaseUser) => {
            // waiting for page to finish loading
            if((isLoading && !authorized) || currentUser === null) {
                console.log("return");
                return;
            };
            
            if(!isLoading && authorized === false) {
                if(!pages.includes(pathname)) {
                    getAuth().signOut();
                    push("/auth");
                }
            }

            if(user) {
                //user is logged in
                if(user?.email !== currentUser.email) {
                    clearSession()
                    console.log("sign out?")
                }

                console.log("auth states user is good")
                setFirebaseUser(user);

                //ignore any auth forms if already logged in
                if(["/auth"].includes(pathname)) {
                    push("/");
                };

            } else {
                //user is not logged in
                if(!isLoading && !pages.includes(pathname)) {
                    push("/auth");
                };
            }
        }, [pathname, isLoading, currentUser, authorized, push]
    );

    //run getUser command everytime to make sure user is authenticated
    React.useEffect(() => {
        getCurrentUser().then(data => {
            if(data) {
                setCurrentUser(data)
                setAuthorized(true)
                setLoading(false)
            } else if(!data) {
                setCurrentUser(null);
                setAuthorized(false);
                setLoading(false)
            }
        });
    }, [getCurrentUser]);

    React.useEffect(() => {
        const subscriber = firebaseAuthStateChanged(getAuth(), user => onAuthStateChanged(user))
        return () => subscriber();
    }, [onAuthStateChanged]);

    return(
        <ThemeProvider theme={currentTheme === "light" ? LightTheme : DarkTheme}>
            <AppProvider value={{
                firebaseUser,
                user: currentUser,
                setUser: user => {
                    setCurrentUser(user)
                },
                theme: currentTheme,
                setTheme: theme => setCurrentTheme(currentTheme === "light" ? "dark" : "light")
            }}>
                <Component {...pageProps}/>
            </AppProvider>
        </ThemeProvider>
    )
};

export default AppContainer