import styled, { css } from "styled-components";
import { DefaultProps, DEFAULT_STYLES } from "lib/Defaults";

export interface NavBarProps extends DefaultProps {
    isActive?: boolean
};

export const Header = styled.header`
    ${DEFAULT_STYLES}

    background-color: #000;
`;

export const HeaderContainer = styled.div`
    ${DEFAULT_STYLES}

    display: flex;
    justify-content: space-between;
    background-color: transparent;
    padding: 20px;
    margin: 0 auto;
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
`;

export const NavItem = styled.li<NavBarProps>`
    ${DEFAULT_STYLES}

    display: list-item;
    padding: 10px;
    font-weight: 500;
    position: relative;
    white-space: nowrap;
    color: ${props => props.isActive ? props.theme.accentColor : "#fff"};

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