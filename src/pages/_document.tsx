import React from 'react';
import Document, { DocumentContext, Head, Html, Main, NextScript } from 'next/document';
import { ServerStyleSheet } from 'styled-components';
import theme from '../styles/theme';

const FAVICONS = ['red.ico', 'blue.ico', 'yellow.ico', 'green.ico'];
export default class MyDocument extends Document {
    static getInitialProps = async (context: DocumentContext) => {
        const sheet = new ServerStyleSheet();
        const originalRenderPage = context.renderPage;

        try {
            context.renderPage = () => originalRenderPage({ enhanceApp: App => props => sheet.collectStyles(<App {...props} />) });
            const initialProps = await Document.getInitialProps(context);

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
    };

    render = () => {
        const favicon = '/favicons/' + FAVICONS[Math.floor(Math.random() * 4)];

        return (
            <Html>
                <Head>
                    <link rel="icon" href={favicon} />
                    <link rel="preconnect" href="https://fonts.googleapis.com" />
                    <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
                    <link href="https://fonts.googleapis.com/css2?family=Inter+Tight:ital,wght@0,100;0,200;0,300;0,400;1,500&display=swap" rel="stylesheet" />
                </Head>
                <body style={{ background: '#3e4658', color: theme['white0'] }}>
                    <Main />
                    <NextScript />
                </body>
            </Html>
        );
    };
}
