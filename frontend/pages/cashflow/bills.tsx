import React from "react";
import NavBar from "ui/components/NavBar/DefNavBar";
import Div from "ui/components/Div";
import { useTheme } from "styled-components";

const Bills = () => {
    const theme = useTheme();

    return(
        <>
        <div style={{ backgroundColor: theme.background, height: "100vh"}}>
            <NavBar />
            
        </div>
        </>
    );
};

export default Bills;