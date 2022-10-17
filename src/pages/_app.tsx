import type { AppProps } from 'next/app';
import { useApollo } from '../hooks/useApollo';
import { ApolloProvider } from '@apollo/client';
import GlobalStyles from '../utils/globalStyles';
import Head from 'next/head';
import { GoogleOAuthProvider } from '@react-oauth/google';
import LoginProvider from '../components/LoginProvider';

const App = ({ Component, pageProps }: AppProps) => {
    const apolloClient = useApollo((pageProps as any).initialApolloState);

    return (
        <ApolloProvider client={apolloClient}>
            <Head>
                <title>Kahut!</title>
            </Head>
            <GlobalStyles />
            <LoginProvider>
                <Component {...pageProps} />
            </LoginProvider>
        </ApolloProvider>
    );
};

export default App;
