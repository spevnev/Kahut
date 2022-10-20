import React from 'react';
import { NextApiRequest } from 'next';
import App, { AppContext, AppProps } from 'next/app';
import Head from 'next/head';
import jwt from 'jsonwebtoken';
import { ApolloProvider } from '@apollo/client';
import { useApollo } from '../hooks/useApollo';
import GlobalStyles from '../styles/globalStyles';
import LoginProvider from '../components/LoginProvider';
import { isBrowser } from '../utils/helper';
import { getCookie } from '../utils/cookies';

const MyApp = ({ pageProps, Component }: AppProps) => {
    const apolloClient = useApollo((pageProps as any).initialApolloState);

    return (
        <>
            <Head>
                <title>Kahut!</title>
            </Head>
            <GlobalStyles />
            <ApolloProvider client={apolloClient}>
                <LoginProvider>
                    <Component {...pageProps} />
                </LoginProvider>
            </ApolloProvider>
        </>
    );
};

MyApp.getInitialProps = async (appContext: AppContext) => {
    const appProps: any = await App.getInitialProps(appContext);

    const token: string | undefined = isBrowser() ? getCookie('token') : (appContext.ctx.req as NextApiRequest).cookies.token;
    const user = token ? jwt.decode(token) : null;

    return { pageProps: { ...appProps.pageProps, user } };
};

export default MyApp;
