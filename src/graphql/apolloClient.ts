import { ApolloClient, HttpLink, InMemoryCache } from '@apollo/client';
import { GRAPHQL_URL } from '../utils/urls';

const createApolloClient = (): ApolloClient<any> => {
    return new ApolloClient({ ssrMode: true, link: new HttpLink({ uri: GRAPHQL_URL, credentials: 'same-origin' }), cache: new InMemoryCache() });
};

export default createApolloClient;
