import { ApolloClient, HttpLink, InMemoryCache, split } from '@apollo/client';
import { getMainDefinition } from '@apollo/client/utilities';
import { GraphQLWsLink } from '@apollo/client/link/subscriptions';
import { useMemo } from 'react';
import { createClient } from 'graphql-ws';
import { API_URL, WEBSOCKET_URL } from '../utils/urls';
import { isBrowser } from '../utils/helper';

const getLink = () => {
    const httpLink = new HttpLink({ uri: API_URL, credentials: 'same-origin' });
    if (!isBrowser()) return httpLink;

    const wsLink = new GraphQLWsLink(createClient({ url: WEBSOCKET_URL }));

    return split(
        ({ query }: any) => {
            const definition = getMainDefinition(query);
            return definition.kind === 'OperationDefinition' && definition.operation === 'subscription';
        },
        wsLink,
        httpLink
    );
};

const createApolloClient = () => new ApolloClient({ ssrMode: !isBrowser(), link: getLink(), cache: new InMemoryCache() });

let apolloClient: ApolloClient<any>;
export const initializeApollo = () => {
    if (!isBrowser()) return createApolloClient();

    if (!apolloClient) apolloClient = createApolloClient();
    return apolloClient;
};

export const useApollo = () => useMemo(() => initializeApollo(), []);
