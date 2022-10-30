import { ApolloServer } from 'apollo-server-micro';
import schema from './schema';
import { ApolloServerPluginLandingPageLocalDefault } from 'apollo-server-core';
import getClient, { DBClient } from '../db/client';
import { getPublishers, Publishers } from '../db/jobScheduler/schedulers';

export type ResolverContext = {
    db: DBClient;
    pubs: Publishers;
};

const createApolloHandler = async (): Promise<ApolloServer> => {
    const plugins = [];

    if (process.env.NODE_ENV === 'development') plugins.push(ApolloServerPluginLandingPageLocalDefault({ embed: true }));

    const apollo = new ApolloServer({
        schema,
        cache: 'bounded',
        csrfPrevention: true,
        plugins,
        context: { db: await getClient(), pubs: getPublishers() } as ResolverContext,
    });

    await apollo.start();
    return apollo;
};

export default createApolloHandler;
