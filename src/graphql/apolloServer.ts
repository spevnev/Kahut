import { ApolloServer } from 'apollo-server-micro';
import schema from './schema';
import prismaClient from '../db/prismaClient';
import { ApolloServerPluginLandingPageLocalDefault } from 'apollo-server-core';

const createApolloHandler = async (): Promise<ApolloServer> => {
    const plugins = [];

    if (process.env.NODE_ENV === 'development') plugins.push(ApolloServerPluginLandingPageLocalDefault({ embed: true }));

    const apollo = new ApolloServer({
        schema,
        cache: 'bounded',
        csrfPrevention: true,
        plugins,
        context: { db: prismaClient },
    });

    return new Promise(async res => {
        await Promise.all([apollo.start(), prismaClient.$connect()]);
        res(apollo);
    });
};

export default createApolloHandler;
