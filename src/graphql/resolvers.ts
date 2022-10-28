import { PrismaClient } from '@prisma/client';
import { createJwt } from '../utils/jwt';
import pubsub from './pubsub';

type ResolverContext = { db: PrismaClient };

const resolvers = {
    Query: {},
    Mutation: {
        joinLobby: async (_parent: any, { username, code }: { username: string; code: string }, { db }: ResolverContext, _info: any): Promise<string | null> => {
            if (code.length !== 6 || username.length < 4 || username.length > 30) return null;

            // TODO: check if username is unique + add

            const exp = Math.floor(Date.now() / 1000) + 60 * 30; // now + 0.5h
            return createJwt({ username, code, exp });
        },
    },
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
