import { ApolloServer } from 'apollo-server-micro';
import schema from './schema';
import { ApolloServerPluginLandingPageLocalDefault } from 'apollo-server-core';
import initClient from '../db/client';

const createApolloHandler = async (): Promise<ApolloServer> => {
    const plugins = [];

    if (process.env.NODE_ENV === 'development') plugins.push(ApolloServerPluginLandingPageLocalDefault({ embed: true }));

    const db = await initClient();
    const apollo = new ApolloServer({
        schema,
        cache: 'bounded',
        csrfPrevention: true,
        plugins,
        context: { db },
    });

    await apollo.start();
    return apollo;
};

export default createApolloHandler;
