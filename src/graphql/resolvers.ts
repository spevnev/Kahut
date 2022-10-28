import { PrismaClient } from '@prisma/client';
import pubsub from './pubsub';

type ResolverContext = { db: PrismaClient };

const resolvers = {
    Query: {},
    Mutation: {},
    Subscription: {
        onGameEvent: {
            subscribe: (_parent: any, { token }: { token: string }) => {
                // TODO: check token
                return pubsub.asyncIterator('GAME_EVENT'); // TODO: append game id to 'GAME_EVENT'
            },
        },
    },
};

export default resolvers;
