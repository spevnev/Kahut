import React from 'react';
import { NextApiRequest } from 'next';
import App, { AppContext, AppProps } from 'next/app';
import Head from 'next/head';
import jwt from 'jsonwebtoken';
import { ApolloProvider } from '@apollo/client';
import { useApolloClient } from '../hooks/useApolloClient';
import { isBrowser } from '../utils/helper';
import { getCookie } from '../utils/cookies';
import GoogleAuthProvider from '../providers/GoogleAuthProvider';
import FileUploadProvider from '../providers/FileUploadProvider';
import User from '../types/user';
import GlobalStyles from '../styles/globalStyles';

type Props = AppProps & {
    props: { user?: User };
    pageProps: { [key: string]: string };
};

const MyApp = ({ pageProps, props, Component }: Props) => {
    const apolloClient = useApolloClient();

    return (
        <>
            <Head>
                <title>Kahut!</title>
            </Head>
            <GlobalStyles />
            <ApolloProvider client={apolloClient}>
                <GoogleAuthProvider user={props.user}>
                    <FileUploadProvider>
                        <Component {...pageProps} />
                    </FileUploadProvider>
                </GoogleAuthProvider>
            </ApolloProvider>
        </>
    );
};

MyApp.getInitialProps = async (appContext: AppContext) => {
    const appProps = await App.getInitialProps(appContext);

    const token: string | undefined = isBrowser() ? getCookie('token') : (appContext.ctx.req as NextApiRequest)?.cookies?.token;
    const user = token ? jwt.decode(token) : null;

    return { pageProps: { ...appProps.pageProps }, props: { user } };
};

export default MyApp;
