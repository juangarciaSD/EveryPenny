import React, { ReactEventHandler } from "react";
import { RoundImage } from "./styles";
import { DefaultProps } from "lib/Defaults";

interface RoundImageInterface extends DefaultProps {
    onClick: ReactEventHandler<HTMLImageElement>
}

const Image = (props: RoundImageInterface) => {
    return(
        <>
        <RoundImage src={`/img/me.jpeg`} {...props}/>
        </>
    )
};

export default Image;