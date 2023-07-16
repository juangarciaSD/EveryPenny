import React, { useContext } from "react";
import { useTheme } from "styled-components";
import { Header, HeaderContainer, Logo, NavBarProps, NavButtons, NavItem, NavList } from "./styles";
import Button from "../Button/DefButton";
import { clearSession } from "lib/auth";
import RoundImage from "../Image/CircleImage";
import Div from "../Div";
import { useRouter } from "next/router";
import DefDropdown from "../Dropdown";
import Link from "next/link";
import AppContext from "lib/AppContext"

const NavBar = (props: NavBarProps) => {
    const theme = useTheme();
    const router = useRouter();
    const { setTheme, theme: currentTheme } = useContext(AppContext)

    const [isDropdownOpen, setDropdownStatus] = React.useState<boolean>(false);

    return(
        <>
        <Header>
            <HeaderContainer>
                <Logo>EveryPenny</Logo>
                <NavList>
                    <NavItem isActive={router.pathname === "/"}>
                        <Link href="/" style={{ padding: 15 }}>Overview</Link>
                    </NavItem>
                    <NavItem isActive={router.pathname === "/cash_flow"}>
                        <Link href="/" style={{ padding: 15 }}>Cash Flow</Link>
                    </NavItem>
                    <NavItem isActive={router.pathname === "/budget"}>
                        <Link href="/" style={{ padding: 15 }}>Budgeting</Link>
                    </NavItem>
                    <NavItem isActive={router.pathname === "/net_worth"}>
                        <Link href="/" style={{ padding: 15 }}>Net Worth</Link>
                    </NavItem>
                    <NavItem isActive={router.pathname === "/transactions"}>
                        <Link href="/" style={{ padding: 15 }}>Transactions</Link>
                    </NavItem>
                </NavList>
                {/* remove button since these do not belong on dashboard due to user being authenticated */}
                <NavButtons>
                    <Div width="auto" height="max-content" marginRight="1rem" padding={0}>
                        <RoundImage onClick={() => setDropdownStatus(!isDropdownOpen)} cursor="pointer" width="2.5rem" height="100%" borderRadius="50%" />
                        <DefDropdown isOpen={isDropdownOpen} items={[{
                            name: "Settings",
                            url: "/settings"
                        }, {
                            name: "Help Center"
                        }, {
                            name: "Feedback"
                        }, {
                            name: "Toggle Theme",
                            onClick: () => {
                                setTheme(currentTheme)
                                setDropdownStatus(false)
                            }
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
                        whiteSpace="nowrap"
                        padding="7px"
                        fontSize="14px"
                        fontWeight="500"
                        // paddingLeft="15px"
                        // paddingRight="15px"
                        // height="2.5rem"  
                        marginRight="10px"
                        background="transparent"
                        hoverOpacity={1}
                        color={`${theme.textColor}`}
                        border={`2px solid ${theme.accentColor}`}
                        hoverBackgroundColor={`${theme.accentColor}`}
                        hoverColor={`${theme.darkBgTextColor}`}
                        transition="0.6s"
                        styleString={`
                            @media screen and (max-width: 700px) {
                                font-size: 12px;
                                margin-right: 0px;
                            }
                        `}>
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