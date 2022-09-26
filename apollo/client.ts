import {useMemo} from "react";
import {ApolloClient, ApolloLink, InMemoryCache} from "@apollo/client";

const isOnServer = typeof window === "undefined";

const createLink = (): ApolloLink => {
	if (isOnServer) {
		const {SchemaLink} = require("@apollo/client/link/schema");
		const {schema} = require("./schema");

		return new SchemaLink({schema});
	} else {
		const {HttpLink} = require("@apollo/client/link/http");

		return new HttpLink({uri: "/api/graphql", credentials: "same-origin"});
	}
};

const createApolloClient = () => new ApolloClient({ssrMode: isOnServer, link: createLink(), cache: new InMemoryCache()});

let apolloClient: ApolloClient<any> | undefined;
export const initializeApollo = (initialState = null): ApolloClient<any> => {
	if (initialState) console.log("!!!\ninitializeApollo has initialState\n!!!");
	const _apolloClient = apolloClient ?? createApolloClient();

	// If your page has Next.js data fetching methods that use Apollo Client, the initial state gets hydrated here
	// if (initialState) {
	// 	const existingCache = _apolloClient.extract(); // Get existing cache, loaded during client side data fetching
	// 	const data = merge(initialState, existingCache); // Merge the existing cache into data passed from getStaticProps/getServerSideProps
	// 	_apolloClient.cache.restore(data); // Restore the cache with the merged data
	// }

	if (!isOnServer && !apolloClient) apolloClient = _apolloClient;
	return _apolloClient;
};

export const useApollo = (initialState: any) => useMemo(() => initializeApollo(initialState), [initialState]);