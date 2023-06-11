import React from "react";
import { useTheme } from "styled-components";
import { Header, HeaderContainer, Logo, NavBarProps, NavButtons, NavItem, NavList } from "./styles";
import Button from "../Button/DefButton";
import { clearSession } from "lib/auth";
import RoundImage from "../Image/CircleImage";
import Div from "../Div";
import { useRouter } from "next/router";
import DefDropdown from "../Dropdown";

const NavBar = (props: NavBarProps) => {
    const theme = useTheme();
    const router = useRouter();

    const [isDropdownOpen, setDropdownStatus] = React.useState<boolean>(false);

    return(
        <>
        <Header>
            <HeaderContainer>
                <Logo>EveryPenny</Logo>
                <NavList>
                    <NavItem isActive={router.pathname === "/"}>
                        <a href="/" style={{ padding: 15 }}>Overview</a>
                    </NavItem>
                    <NavItem isActive={router.pathname === "/cash_flow"}>
                        <a href="/" style={{ padding: 15 }}>Cash Flow</a>
                    </NavItem>
                    <NavItem isActive={router.pathname === "/budget"}>
                        <a href="/" style={{ padding: 15 }}>Budgeting</a>
                    </NavItem>
                    <NavItem isActive={router.pathname === "/net_worth"}>
                        <a href="/" style={{ padding: 15 }}>Net Worth</a>
                    </NavItem>
                    <NavItem isActive={router.pathname === "/transactions"}>
                        <a href="/" style={{ padding: 15 }}>Transactions</a>
                    </NavItem>
                </NavList>
                {/* remove button since these do not belong on dashboard due to user being authenticated */}
                <NavButtons>
                    <Div width="auto" height="max-content" marginRight="1rem" padding={0}>
                        <RoundImage onClick={() => setDropdownStatus(!isDropdownOpen)} cursor="pointer" width="2.5rem" height="100%" borderRadius="50%" />
                        <DefDropdown isOpen={isDropdownOpen} items={[{
                            name: "Settings",
                        }, {
                            name: "Help Center"
                        }, {
                            name: "Feedback"
                        }, {
                            name: "Toggle Theme"
                        }]} />
                    </Div>
                    {/* <Button
                        paddingLeft="15px"
                        paddingRight="15px"
                        height="2.5rem"
                        marginRight="10px"
                        hoverOpacity="0.7"
                        transition="0.6s">
                        Login
                    </Button> */}
                    <div style={{ flex: 1 }} />
                    {/* <Button
                        paddingLeft="15px"
                        paddingRight="15px"
                        height="2.5rem"
                        marginRight="10px"
                        background="transparent"
                        border={`2px solid ${theme.accentColor}`}
                        hoverBackgroundColor={`${theme.accentColor}`}
                        hoverOpacity="0.7"
                        transition="0.6s">
                        Sign Up
                    </Button> */}
                    <Button
                        onClick={clearSession}
                        paddingLeft="15px"
                        paddingRight="15px"
                        height="2.5rem"
                        marginRight="10px"
                        background="transparent"
                        border={`2px solid ${theme.accentColor}`}
                        hoverBackgroundColor={`${theme.accentColor}`}
                        hoverOpacity="0.7"
                        transition="0.6s">
                        Sign Out
                    </Button>
                </NavButtons>
                {props.children}
            </HeaderContainer>
        </Header>
        </>
    )
};

export default NavBar;