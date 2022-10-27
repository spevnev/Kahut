import { PrismaClient } from '@prisma/client';

type ResolverContext = { db: PrismaClient };
// Resolver: async (_parent: any, _args: any, _context: ResolverContext, _info: any): Promise<...> => {}

const resolvers = {
    Query: {},
    Mutation: {},
    Subscription: {},
};

export default resolvers;
