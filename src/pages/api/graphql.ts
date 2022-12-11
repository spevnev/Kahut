import { NextApiHandler } from 'next';
import { createYoga } from 'graphql-yoga';
import { getPublishers, Publishers } from '../../db/jobScheduler/schedulers';
import getClient, { DBClient } from '../../db/client';
import schema from '../../graphql/schema';

export type ResolverContext = {
    db: DBClient;
    pubs: Publishers;
};

let handler: any;
const handle: NextApiHandler = async (request, response) => {
    if (!handler) {
        const context: ResolverContext = { db: await getClient(), pubs: getPublishers() };
        handler = createYoga({ graphqlEndpoint: '/api/graphql', schema, context, cors: false });
    }

    return handler(request, response);
};

export default handle;
export const config = { api: { bodyParser: false } };
