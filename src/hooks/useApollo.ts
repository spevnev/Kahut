import { useMemo } from 'react';
import { ApolloClient, ApolloLink, InMemoryCache } from '@apollo/client';
import { isBrowser } from '../utils/helper';

const createLink = (): ApolloLink => {
    if (isBrowser()) {
        const { split, HttpLink } = require('@apollo/client');
        const { getMainDefinition } = require('@apollo/client/utilities');
        const { GraphQLWsLink } = require('@apollo/client/link/subscriptions');
        const { createClient } = require('graphql-ws');

        const httpLink = new HttpLink({ uri: '/api/graphql', credentials: 'same-origin' });
        const wsLink = new GraphQLWsLink(
            createClient(process.env.NODE_ENV === 'development' ? { url: 'ws://localhost:3001/api/graphql' } : { uri: '/api/graphql' })
        );

        return split(
            ({ query }: any) => {
                const definition = getMainDefinition(query);
                return definition.kind === 'OperationDefinition' && definition.operation === 'subscription';
            },
            wsLink,
            httpLink
        );
    } else {
        const { SchemaLink } = require('@apollo/client/link/schema');
        const { schema } = require('../graphql/schema');

        return new SchemaLink({ schema });
    }
};

const createApolloClient = () => new ApolloClient({ ssrMode: !isBrowser(), link: createLink(), cache: new InMemoryCache() });

let apolloClient: ApolloClient<any> | undefined;
export const initializeApollo = (initialState = null): ApolloClient<any> => {
    const _apolloClient = apolloClient ?? createApolloClient();
    if (isBrowser() && !apolloClient) apolloClient = _apolloClient;

    return _apolloClient;
};

export const useApollo = (initialState: any) => useMemo(() => initializeApollo(initialState), [initialState]);
