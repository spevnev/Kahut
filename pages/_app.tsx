import type {AppProps} from "next/app";
import Head from "next/head";

const FAVICONS = ["red.ico", "blue.ico", "yellow.ico", "green.ico"]

const MyApp = ({Component, pageProps}: AppProps) => {
	const favicon = '/favicons/' + FAVICONS[Math.floor(Math.random() * 4)];

	return (
		<>
			<Head>
				<title>Kahut!</title>
				<link rel="icon" href={favicon}/>
			</Head>
			<Component {...pageProps} />
		</>
	);
};

export default MyApp;
