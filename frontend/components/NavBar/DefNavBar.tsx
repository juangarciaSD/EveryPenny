import React from "react";
import { useTheme } from "styled-components";
import { Header, HeaderContainer, Logo, NavBarProps, NavButtons, NavItem, NavList } from "./styles";
import Button from "../Button/DefButton";
import { clearSession } from "lib/auth";

const NavBar = (props: NavBarProps) => {
    const theme = useTheme();

    return(
        <>
        <Header>
            <HeaderContainer>
                <Logo>Logo</Logo>
                <NavList>
                    <NavItem>
                        <a href="/" style={{ padding: 15 }}>Overview</a>
                    </NavItem>
                    <NavItem>
                        <a href="/" style={{ padding: 15 }}>Cash Flow</a>
                    </NavItem>
                    <NavItem>
                        <a href="/" style={{ padding: 15 }}>Budgeting</a>
                    </NavItem>
                    <NavItem>
                        <a href="/" style={{ padding: 15 }}>Net Worth</a>
                    </NavItem>
                    <NavItem>
                        <a href="/" style={{ padding: 15 }}>Transactions</a>
                    </NavItem>
                </NavList>
                {/* remove button since these do not belong on dashboard due to user being authenticated */}
                <NavButtons>
                    <Button
                        paddingLeft="15px"
                        paddingRight="15px"
                        height="2.5rem"
                        marginRight="10px"
                        hoverOpacity="0.7"
                        transition="0.6s">
                        Login
                    </Button>
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