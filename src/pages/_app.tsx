import type {AppProps} from "next/app";
import {useApollo} from "../apollo/client";
import {ApolloProvider} from "@apollo/client";
import GlobalStyles from "../utils/globalStyles";
import Head from "next/head";

const App = ({Component, pageProps}: AppProps) => {
	const apolloClient = useApollo((pageProps as any).initialApolloState);

	return (
		<ApolloProvider client={apolloClient}>
			<Head>
				<title>Kahut!</title>
			</Head>
			<GlobalStyles/>
			<Component {...pageProps} />
		</ApolloProvider>
	);
};

export default App;
