import { ApolloClient, HttpLink, InMemoryCache, NormalizedCacheObject } from '@apollo/client';
import { API_URL } from '../utils/urls';

const createApolloClient = (): ApolloClient<NormalizedCacheObject> =>
    new ApolloClient({ ssrMode: true, link: new HttpLink({ uri: API_URL, credentials: 'same-origin' }), cache: new InMemoryCache() });

export default createApolloClient;
