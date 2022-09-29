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
	if (!isOnServer && !apolloClient) apolloClient = _apolloClient;

	return _apolloClient;
};

export const useApollo = (initialState: any) => useMemo(() => initializeApollo(initialState), [initialState]);