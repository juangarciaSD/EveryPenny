import styled, { css } from "styled-components";
import { DefaultProps, DEFAULT_STYLES } from "lib/Defaults";

export interface NavBarProps extends DefaultProps {
    isActive?: boolean
};

export const Header = styled.header`
    ${DEFAULT_STYLES}

    background-color: ${props => props.theme.navBarTheme};
`;

export const HeaderContainer = styled.div`
    ${DEFAULT_STYLES}

    display: flex;
    justify-content: space-between;
    background-color: transparent;
    padding: 21px;
    margin: 0 auto;
    max-width: 90%;
    min-width: 65%;

    @media screen and (max-width: 700px) {
        padding: 12px 0px;
        margin: auto;
    }
`;

export const NavContainer = styled.div`
    ${DEFAULT_STYLES}

    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 0 auto;
    maxWidth: 1560px;
`;

export const Logo = styled.div`
    ${DEFAULT_STYLES}
    
    width: 255px;
`;

export const NavList = styled.ul`
    ${DEFAULT_STYLES}

    display: flex;
    align-items: center;
    list-style: none;
    padding: 0;
    margin: 0;

    @media screen and (max-width: 700px) {
        display: none;
    }
`;

export const NavItem = styled.li<NavBarProps>`
    ${DEFAULT_STYLES}

    display: list-item;
    padding: 10px;
    font-weight: 500;
    position: relative;
    white-space: nowrap;
    color: ${props => props.isActive ? props.theme.accentColor : props.theme.textColor};

    :hover {
        transition: color 200ms ease-in-out;
        color: ${props => props.theme.accentColor};
    }
`;

export const NavButtons = styled.div`
    ${DEFAULT_STYLES}

    display: flex;
    align-items: center;
    justify-content: space-between;
    position: relative;
`;