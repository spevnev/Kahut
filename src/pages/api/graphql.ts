import { createYoga } from 'graphql-yoga';
import getClient, { DBClient } from '../../db/client';
import { getPublishers, Publishers } from '../../db/jobScheduler/schedulers';
import schema from '../../graphql/schema';

export type ResolverContext = {
    db: DBClient;
    pubs: Publishers;
};

const createHandler = async () => createYoga({ graphqlEndpoint: '/api/graphql', schema, context: { db: await getClient(), pubs: getPublishers() } as ResolverContext });

let handler: any;
const handle = async (...args: any[]) => {
    if (!handler) handler = await createHandler();
    return handler(...args);
};

export default handle;

export const config = { api: { bodyParser: false } };
