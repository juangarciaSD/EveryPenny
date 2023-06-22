import React, { CSSProperties, ReactComponentElement } from "react";
import { DefaultTheme, useTheme } from "styled-components";
import Div from "ui/components/Div";
import NavBar from "ui/components/NavBar";
import Account from "../../public/svg/settings/account.svg";


import { Personal } from "components/Settings"

interface SettingsItemInterface {
    name: string;
    svg?: React.FC;
    svgBackground: string;
    url: string;
    className: ActiveTab;
}

type ActiveTab = "personal" | "financial" | "security" | "notifications" | "theme"

const Settings = () => {
    const theme = useTheme();

    const [activeTab, setActiveTab] = React.useState<ActiveTab>("personal");

    

    return(
        <>
        <NavBar />
        <Div 
            height={"calc(100% - 85px)"} 
            display="flex" 
            padding={0}
            borderRadius={"none"}
            backgroundColor={`${theme.background}`}>
            <Div 
                display="flex" 
                width={"85%"} 
                height={"85%"} 
                margin={"auto"} 
                padding={"12px"}
                backgroundColor={`${theme.canvasBg}`}>
                {/* sidebar */}
                <Div width={"25%"} padding={"0 5px"} height={"100%"} backgroundColor={"inherit"}>
                    <SettingsItem theme={theme} activeTab={activeTab} setActiveTab={setActiveTab} items={[
                        {
                            name: "Personal Info",
                            svg: Account,
                            svgBackground: "#000",
                            url: "/",
                            className: "personal"
                        },
                        {
                            name: "Financial Info",
                            svg: Account,
                            svgBackground: "#000",
                            url: "/",
                            className: "financial"
                        },
                        {
                            name: "Security",
                            svg: Account,
                            svgBackground: "#000",
                            url: "/",
                            className: "security"
                        },
                        {
                            name: "Notifications",
                            svg: Account,
                            svgBackground: "#000",
                            url: "/",
                            className: "notifications"
                        },
                        {
                            name: "Theme",
                            svg: Account,
                            svgBackground: "#000",
                            url: "/",
                            className: "theme"
                        },
                    ]} />
                </Div>
                <Div
                    width="100%"
                    height="100%"
                    backgroundColor={`${theme.background}`}>
                        <h1></h1>
                        <div 
                            style={{ display: `${activeTab === "personal" ? "block" : "none"}`}}>
                            <Personal />
                        </div>
                        <div style={{ display: `${activeTab === "financial" ? "block" : "none"}`}}>hello finance</div>
                        <div style={{ display: `${activeTab === "security" ? "block" : "none"}`}}>hello security</div>
                        <div style={{ display: `${activeTab === "notifications" ? "block" : "none"}`}}>hello notifications</div>
                        <div style={{ display: `${activeTab === "theme" ? "block" : "none"}`}}>hello theme</div>
                </Div>
            </Div>
        </Div>
        </>
    );
};

const SettingsItem = (props: { items: Array<SettingsItemInterface>, activeTab: ActiveTab, setActiveTab: React.Dispatch<React.SetStateAction<ActiveTab>>, theme: DefaultTheme }) => {
    return(
       <>
       {props.items.map((val) => { return(
        <>
            <Div 
                display="flex" 
                backgroundColor={`${props.activeTab === val.className ? props.theme.background : "transparent"}`}
                padding={"8px"} 
                cursor="pointer" 
                hoverBackgroundColor={`${props.theme.background}`} 
                transition="200ms ease-in-out"
                className={val.className}
                onClick={() => props.setActiveTab(val.className)}>
                <Div 
                    width={"50px"} 
                    height={"50px"} 
                    backgroundColor="#f8f8f8" 
                    borderRadius={"50%"} 
                    overflow="hidden">
                    <val.svg />
                </Div>
                <Div width={"100%"} height={"100%"} paddingLeft={"0.80rem"} margin="auto" display="flex">
                    <span style={{ fontSize: "18px" }}>{val.name}</span>
                </Div>
            </Div>
        </>
       )})}
       </>
    )
};

export default Settings;