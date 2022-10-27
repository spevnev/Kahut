import { PrismaClient } from '@prisma/client';
import { ApolloServer } from 'apollo-server-micro';
import schema from './schema';
import { ApolloServerPluginLandingPageLocalDefault } from 'apollo-server-core';

const createApolloHandler = async (): Promise<ApolloServer> => {
    const prismaClient = new PrismaClient();
    const apollo = new ApolloServer({
        schema,
        cache: 'bounded',
        csrfPrevention: true,
        plugins: [ApolloServerPluginLandingPageLocalDefault({ embed: true })],
        context: { db: prismaClient },
    });

    return new Promise(async res => {
        await Promise.all([apollo.start(), prismaClient.$connect()]);
        res(apollo);
    });
};

export default createApolloHandler;
