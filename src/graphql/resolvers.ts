import { PrismaClient } from '@prisma/client';
import { PubSub } from 'graphql-subscriptions';

const pubsub = new PubSub();
setInterval(() => pubsub.publish('TEST', { test: Math.floor(Math.random() * 100) }), 8000);

type ResolverContext = { db: PrismaClient };
// Resolver: async (_parent: any, _args: any, _context: ResolverContext, _info: any): Promise<...> => {}

const resolvers = {
    Subscription: {
        test: {
            subscribe: () => pubsub.asyncIterator('TEST'),
        },
    },
};

export default resolvers;
