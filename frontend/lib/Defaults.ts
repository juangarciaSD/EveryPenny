import * as React from "react";
import { css } from "styled-components";

export interface DefaultProps {
    position?: React.CSSProperties["position"];
    top?: React.CSSProperties["top"];
    left?: React.CSSProperties["left"];
    right?: React.CSSProperties["right"];
    bottom?: React.CSSProperties["bottom"];
    zIndex?: React.CSSProperties["zIndex"];
    transform?: React.CSSProperties["transform"];

    padding?: React.CSSProperties["padding"];
    paddingLeft?: React.CSSProperties["paddingLeft"];
    paddingRight?: React.CSSProperties["paddingRight"];
    paddingBottom?: React.CSSProperties["paddingBottom"];
    paddingTop?: React.CSSProperties["paddingTop"];

    margin?: React.CSSProperties["margin"];
    marginLeft?: React.CSSProperties["marginLeft"];
    marginRight?: React.CSSProperties["marginRight"];
    marginBottom?: React.CSSProperties["marginBottom"];
    marginTop?: React.CSSProperties["marginTop"];

    border?: React.CSSProperties["border"];
    borderBottom?: React.CSSProperties["borderBottom"];
    borderTop?: React.CSSProperties["borderTop"];
    borderLeft?: React.CSSProperties["borderLeft"];
    borderRight?: React.CSSProperties["borderRight"];
    outline?: React.CSSProperties["outline"];
    borderRadius?: React.CSSProperties["borderRadius"];
    borderTopLeftRadius?: React.CSSProperties["borderTopLeftRadius"];
    borderTopRightRadius?: React.CSSProperties["borderTopRightRadius"];

    color?: React.CSSProperties["color"];
    textColor?: React.CSSProperties["color"];
    background?: React.CSSProperties["background"];
    bg?: React.CSSProperties["background"];
    backgroundColor?: React.CSSProperties["backgroundColor"];
    display?: React.CSSProperties["display"];
    alignItems?: React.CSSProperties["alignItems"];
    justifyContent?: React.CSSProperties["justifyContent"];
    gap?: React.CSSProperties["gap"];
    flexDirection?: React.CSSProperties["flexDirection"];
    alignContent?: React.CSSProperties["alignContent"];
    placeContent?: React.CSSProperties["placeContent"];
    placeItems?: React.CSSProperties["placeItems"];
    flexGrow?: React.CSSProperties["flexGrow"];
    verticalAlign?: React.CSSProperties["verticalAlign"];
    alignSelf?: React.CSSProperties["alignSelf"];
    flex?: React.CSSProperties["flex"];

    minWidth?: React.CSSProperties["minWidth"];
    maxWidth?: React.CSSProperties["maxWidth"];
    width?: React.CSSProperties["width"];
    minHeight?: React.CSSProperties["minHeight"];
    maxHeight?: React.CSSProperties["maxHeight"];
    height?: React.CSSProperties["height"];

    textAlign?: React.CSSProperties["textAlign"];
    textDecoration?: React.CSSProperties["textDecoration"];
    fontSize?: React.CSSProperties["fontSize"];
    fontWeight?: React.CSSProperties["fontWeight"];
    textTransform?: React.CSSProperties["textTransform"];
    textIndent?: React.CSSProperties["textIndent"];
    letterSpacing?: React.CSSProperties["letterSpacing"];
    lineHeight?: React.CSSProperties["lineHeight"];
    direction?: React.CSSProperties["direction"];
    textShadow?: React.CSSProperties["textShadow"];
    textOverflow?: React.CSSProperties["textOverflow"];
    whiteSpace?: React.CSSProperties["whiteSpace"];

    float?: React.CSSProperties["float"];
    cursor?: React.CSSProperties["cursor"];

    children?: React.ReactNode;
    boxSizing?: React.CSSProperties["boxSizing"];
    boxShadow?: React.CSSProperties["boxShadow"];

    transition?: React.CSSProperties["transition"];
    pointerEvents?: React.CSSProperties["pointerEvents"];
    opacity?: React.CSSProperties["opacity"];
    overflow?: React.CSSProperties["overflow"];
    overflowX?: React.CSSProperties["overflowX"];
    overflowY?: React.CSSProperties["overflowY"];
    userSelect?: React.CSSProperties["userSelect"];

    wordBreak?: React.CSSProperties["wordBreak"];
    objectFit?: React.CSSProperties["objectFit"];

    hoverBackgroundColor?: React.CSSProperties["backgroundColor"];
    hoverColor?: React.CSSProperties["color"];
    hoverOpacity?: React.CSSProperties["opacity"]
    focusBorderColor?: React.CSSProperties["borderColor"];

    gridTemplateColumns?: React.CSSProperties["gridTemplateColumns"];
    gridTemplateRows?: React.CSSProperties["gridTemplateRows"];
    gridTemplateAreas?: React.CSSProperties["gridTemplateAreas"];
    gridArea?: React.CSSProperties["gridArea"];
}

export const DEFAULT_STYLES = css<DefaultProps>`
    z-index: ${props => props.zIndex};
    position: ${props => props.position};
    top: ${props => props.top};
    left: ${props => props.left};
    right: ${props => props.right};
    bottom: ${props => props.bottom};
    transform: ${props => props.transform};

    padding: ${props => props.padding};
    padding-left: ${props => props.paddingLeft};
    padding-right: ${props => props.paddingRight};
    padding-top: ${props => props.paddingTop};
    padding-bottom: ${props => props.paddingBottom};

    margin: ${props => props.margin};
    margin-left: ${props => props.marginLeft};
    margin-right: ${props => props.marginRight};
    margin-top: ${props => props.marginTop};
    margin-bottom: ${props => props.marginBottom};

    border: ${props => props.border};
    border-bottom: ${props => props.borderBottom};
    border-top: ${props => props.borderTop};
    border-left: ${props => props.borderLeft};
    border-right: ${props => props.borderRight};
    border-radius: ${props => props.borderRadius};
    border-top-right-radius: ${props => props.borderTopRightRadius};
    border-top-left-radius: ${props => props.borderTopLeftRadius};
    outline: ${props => props.outline};

    color: ${props => props.color || props.textColor || props.theme.textColor};
    background: ${props => props.background || props.bg};
    background-color: ${props => props.backgroundColor};
    display: ${props => props.display};
    align-items: ${props => props.alignItems};
    align-content: ${props => props.alignContent};
    align-self: ${props => props.alignSelf};
    justify-content: ${props => props.justifyContent};
    gap: ${props => props.gap};
    flex-direction: ${props => props.flexDirection};
    place-content: ${props => props.placeContent};
    place-items: ${props => props.placeItems};
    flex-grow: ${props => props.flexGrow};
    vertical-align: ${props => props.verticalAlign};
    align-self: ${props => props.alignSelf};
    flex: ${props => props.flex};

    min-width: ${props => props.minWidth};
    max-width: ${props => props.maxWidth};
    width: ${props => props.width};
    min-height: ${props => props.minHeight};
    max-height: ${props => props.maxHeight};
    height: ${props => props.height};

    text-align: ${props => props.textAlign};
    text-decoration: ${props => props.textDecoration};
    font-size: ${props => props.fontSize};
    font-weight: ${props => props.fontWeight};
    text-transform: ${props => props.textTransform};
    text-indent: ${props => props.textIndent};
    letter-spacing: ${props => props.letterSpacing};
    line-height: ${props => props.lineHeight};
    direction: ${props => props.direction};
    text-shadow: ${props => props.textShadow};
    text-overflow: ${props => props.textOverflow};
    white-space: ${props => props.whiteSpace};

    float: ${props => props.float};
    cursor: ${props => props.cursor};
    box-shadow: ${props => props.boxShadow};
    box-sizing: ${props => props.boxSizing};
    opacity: ${props => props.opacity};
    transition: ${props => props.transition};
    pointer-events: ${props => props.pointerEvents};
    user-select: ${props => props.userSelect};

    overflow: ${props => props.overflow};
    overflow-x: ${props => props.overflowX};
    overflow-y: ${props => props.overflowY};

    word-break: ${props => props.wordBreak};
    font-family: inherit;
    object-fit: ${props => props.objectFit};

    grid-template-columns: ${props => props.gridTemplateColumns};
    grid-template-rows: ${props => props.gridTemplateRows};
    grid-template-areas: ${props => props.gridTemplateAreas};
    grid-area: ${props => props.gridArea};

    &:hover {
        background-color: ${props => props.hoverBackgroundColor};
        color: ${props => props.hoverColor};
        opacity: ${props => props.hoverOpacity}
    }

    &:focus {
        border-color: ${props => props.focusBorderColor};
        transition: 200ms ease-in-out border-color;
    }
`;