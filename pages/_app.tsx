import type {AppProps} from "next/app";
import Head from "next/head";
import {useApollo} from "../apollo/client";
import {ApolloProvider} from "@apollo/client";

const FAVICONS = ["red.ico", "blue.ico", "yellow.ico", "green.ico"];

const App = ({Component, pageProps}: AppProps) => {
	const apolloClient = useApollo((pageProps as any).initialApolloState);
	const favicon = "/favicons/" + FAVICONS[Math.floor(Math.random() * 4)];

	return (
		<>
			<Head>
				<title>Kahut!</title>
				<link rel="icon" href={favicon}/>
			</Head>
			<ApolloProvider client={apolloClient}>
				<Component {...pageProps} />
			</ApolloProvider>
		</>
	);
};

export default App;
