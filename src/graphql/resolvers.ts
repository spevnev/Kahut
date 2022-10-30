import jwt from 'jsonwebtoken';
import joinLobby from './mutations/joinLobby';
import createLobby from './mutations/createLobby';

export const GAME_TOKEN_DURATION = 60 * 45; // 45m

const resolvers = {
    Query: {},
    Mutation: { joinLobby, createLobby },
    Subscription: {
        onGameEvent: { subscribe: async (_parent: any, { token }: { token: string }) => pubsub.asyncIterator(`GAME_EVENT_${(jwt.decode(token) as any).code}`) },
    },
};

export default resolvers;
