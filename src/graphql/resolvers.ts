import { createJwt } from '../utils/jwt';
import pubsub from './pubSubClient';
import jwt from 'jsonwebtoken';
import { DBClient } from '../db/client';

const GAME_TOKEN_DURATION = 60 * 45; // (s); = 45m

type ResolverContext = { db: DBClient };

const resolvers = {
    Query: {},
    Mutation: {
        joinLobby: async (
            _parent: any,
            { username, code, picture }: { username: string; picture: string | null; code: string },
            { db }: ResolverContext,
            _info: any
        ): Promise<string | null> => {
            if (code.length !== 6 || username.length < 4 || username.length > 30) return null;

            const { rowCount } = await db.query(`INSERT INTO players(username, picture, game_id) VALUES ($1, $2, $3) ON CONFLICT DO NOTHING;`, [
                username,
                picture,
                code,
            ]);
            if (rowCount === 0) return null;

            const exp = Math.floor(Date.now() / 1000) + GAME_TOKEN_DURATION;
            return createJwt({ username, code, exp });
        },
    },
    Subscription: {
        onGameEvent: { subscribe: async (_parent: any, { token }: { token: string }) => pubsub.asyncIterator(`GAME_EVENT_${(jwt.decode(token) as any).code}`) },
    },
};

export default resolvers;
