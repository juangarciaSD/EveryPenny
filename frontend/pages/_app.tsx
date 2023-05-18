import { NextPage } from "next";
import { AppProps } from "next/app";
import { ThemeProvider } from "styled-components";
import { DarkTheme, LightTheme } from "lib/ThemeProvider";
import { AppProvider } from "lib/AppContext";

const AppContainer: NextPage<AppProps> = ({ Component, pageProps }) => {
    return(
        <ThemeProvider theme={DarkTheme}>
            <AppProvider value={{
                theme: "light",
                setTheme: theme => {return}
            }}>
                <Component {...pageProps}/>
            </AppProvider>
        </ThemeProvider>
    )
};

export default AppContainer