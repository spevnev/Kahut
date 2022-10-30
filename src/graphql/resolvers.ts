import jwt from 'jsonwebtoken';
import joinLobby from './mutations/joinLobby';
import createLobby from './mutations/createLobby';
import startLobby from './mutations/startLobby';

const resolvers = {
    Query: {},
    Mutation: { joinLobby, createLobby, startLobby },
    Subscription: {
        onGameEvent: { subscribe: async (_parent: any, { token }: { token: string }) => pubsub.asyncIterator(`GAME_EVENT_${(jwt.decode(token) as any).code}`) },
    },
};

export default resolvers;
