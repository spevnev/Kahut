import jwt from 'jsonwebtoken';
import joinLobby from './mutations/joinLobby';
import createLobby from './mutations/createLobby';
import startLobby from './mutations/startLobby';
import GameToken from '../types/gameToken';
import pubsub from './gamePubSub';

const resolvers = {
    Query: {},
    Mutation: { joinLobby, createLobby, startLobby },
    Subscription: {
        onGameEvent: {
            subscribe: async (_parent: void, { game_token }: { game_token: string }) => {
                const code = (jwt.decode(game_token) as GameToken).code;
                return pubsub.asyncIterator(`GAME_EVENT_${code}`);
            },
        },
    },
};

export default resolvers;
