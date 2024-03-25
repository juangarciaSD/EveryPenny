import React from "react";
import { useTheme } from "styled-components"
import NavBar from "ui/components/NavBar";
import Div from "ui/components/Div";

const NetWorth = () => {
    const theme = useTheme();

    return(
        <>
            <NavBar />
            <div style={{ backgroundColor: theme.background, height: "100%", maxHeight: "100vh" }}>
                <Div display="flex" flexDirection="column" justifyContent="center" padding={0}>
                
                </Div>    
            </div>
        </>
    );
};

export default NetWorth;