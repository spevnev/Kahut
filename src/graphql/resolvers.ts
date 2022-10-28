import { PrismaClient } from '@prisma/client';
import { createJwt } from '../utils/jwt';
import pubsub from '../clients/pubSubClient';
import jwt from 'jsonwebtoken';

const GAME_TOKEN_DURATION = 60 * 30; // (s); = 0.5h

type ResolverContext = { db: PrismaClient };

const resolvers = {
    Query: {},
    Mutation: {
        joinLobby: async (_parent: any, { username, code }: { username: string; code: string }, { db }: ResolverContext, _info: any): Promise<string | null> => {
            if (code.length !== 6 || username.length < 4 || username.length > 30) return null;

            // prisma kinda stinks - tell greg that i love sql more - it's more flexible

            const exp = Math.floor(Date.now() / 1000) + GAME_TOKEN_DURATION;
            return createJwt({ username, code, exp });
        },
    },
    Subscription: {
        onGameEvent: { subscribe: async (_parent: any, { token }: { token: string }) => pubsub.asyncIterator(`GAME_EVENT_${(jwt.decode(token) as any).code}`) },
    },
};

export default resolvers;
