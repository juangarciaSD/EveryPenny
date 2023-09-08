import React from "react";
import Div from "../Div";
import Button from "../Button";
import { useTheme } from "styled-components";
import { ModalTitle } from "./styles";

interface ModalInterface {
    onCancelModal: React.MouseEventHandler<HTMLButtonElement>,
    onSaveModal: React.MouseEventHandler<HTMLButtonElement>,
    setModalState: React.Dispatch<React.SetStateAction<boolean>>,
    isModalActive: boolean,
    children?: React.ReactNode,
    title?: string,
    cancelText?: string,
    cancelHoverColor?: string
}

const Modal = (props: ModalInterface) => {
    const theme = useTheme();


    return(
        <>
        <div onClick={() => props.setModalState(false)} style={{ display: props.isModalActive ? "flex" : "none", position: "fixed", zIndex: 1, left: 0, 
                top: 0, width: "100%", height: "100%", overflow: "auto", backgroundColor: "rgba(0,0,0,0.4)"}}>
            <Div onClick={e => e.stopPropagation()} stringStyle={`
                overflow: auto;

                @media screen and (max-width: 1200px) {
                    width: 50vw;
                    height: 90vh;
                }

                @media screen and (max-width: 700px) {
                    width: 100vw;
                    height: 100vh;
                    border-radius: 0px;
                }
            `} minWidth="28%" width={"28%"} height={"90%"} margin={"auto"} padding={"10px"} backgroundColor={theme.background}>
                
                {/* @media screen and (-webkit-min-device-pixel-ratio:0) { 
  select,
  textarea,
  input {
    font-size: 16px;
  }
} */}
                <ModalTitle style={{ margin: 0, padding: "10px 10px 0px 10px", color: theme.darkBgTextColor}}>{props.title}</ModalTitle>
                <Div padding={"10px"}>
                    {props.children}
                </Div>
                <Div padding="10px">
                    <Button onClick={props.onCancelModal} marginRight={"5px"} backgroundColor="transparent" transition="200ms ease-in-out" 
                    hoverBorder={props.cancelHoverColor ? props.cancelHoverColor : theme.accentColor} border={"2px solid " + theme.accentColor}>
                        {props.cancelText ? props.cancelText : "Cancel"}
                    </Button>
                    <Button onClick={props.onSaveModal} hoverBorder={theme.accentColor} border={"2px solid " + theme.accentColor}>
                        Save Bill
                    </Button>
                </Div>
            </Div>
        </div>
        </>
    )
};

export default Modal;