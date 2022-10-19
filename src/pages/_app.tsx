import type { AppProps } from 'next/app';
import { useApollo } from '../hooks/useApollo';
import { ApolloProvider } from '@apollo/client';
import GlobalStyles from '../utils/globalStyles';
import Head from 'next/head';
import LoginProvider from '../components/LoginProvider';

const App = ({ pageProps, Component }: AppProps) => {
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

export default App;
