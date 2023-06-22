import Document, {
    Html,
    Head,
    Main,
    NextScript,
    DocumentContext,
} from "next/document";
import * as React from "react";
import { ServerStyleSheet, useTheme } from "styled-components";
import Script from "next/script";

// const Font = createGlobalStyle`
//   @font-face {
//     font-family: 'Rubik',
//     src: url('../public/assets/Rubik/Rubik-Regular.tff')
//   }
// `;

interface GetInitialProps {
    styles: JSX.Element;
    html: string;
    head?: JSX.Element[];
}

class EveryPenny extends Document {
    static async getInitialProps(
        ctx: DocumentContext
    ): Promise<GetInitialProps> {
        const sheet = new ServerStyleSheet();
        const originalRenderPage = ctx.renderPage;

        try {
            ctx.renderPage = () =>
                originalRenderPage({
                    enhanceApp: App => props =>
                        sheet.collectStyles(<App {...props} />),
                });

            const initialProps = await Document.getInitialProps(ctx);
            return {
                ...initialProps,
                styles: (
                    <>
                        {initialProps.styles}
                        {sheet.getStyleElement()}
                    </>
                ),
            };
        } finally {
            sheet.seal();
        }
    }

    render(): JSX.Element {
        return (
            <Html lang="en">
                <Head>
                    <meta charSet="utf-8" />
                    <style>{`
                        html,
                        body {
                            padding: 0;
                            margin: 0;
                            font-family: system-ui,-apple-system,Segoe UI,Roboto,Helvetica,Arial,Apple Color Emoji,Segoe UI Emoji,sans-serif;
                            overflow: auto;
                            outline: none;
                        }

                        body {
                            width: 100vw;
                            height: 100vh;
                        }

                        a {
                            color: inherit;
                            text-decoration: none;
                        }
            
                        * {
                        box-sizing: border-box;
                        }
                        
                        *::-webkit-scrollbar {
                            -webkit-appearance: none;
                            width: 8px;
                            height: 8px;
                            background-color: transparent;
                            border-radius: 15px;
                        }
            
                        *::-webkit-scrollbar-thumb {
                            transition: 200ms ease-in-out;
                            background-color: #242d39;
                            border-radius: 15px;
                        }
            
                        *::-webkit-scrollbar:hover {
                            background-color: #242d39;
                        }

                        #__next {
                            height: 100%;
                        }
                    `}</style>
                </Head>
                <body>
                    <Main />
                    <NextScript />
                </body>
            </Html>
        );
    }
}

export default EveryPenny;