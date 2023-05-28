declare module "*.svg" {
    import * as React from "react";

    export const ReactComponent: React.FC<React.ReactSVGElement<>>;
    const src: string;
    export default src;
}