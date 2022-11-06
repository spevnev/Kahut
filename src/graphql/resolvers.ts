import jwt from 'jsonwebtoken';
import joinLobby from './mutations/joinLobby';
import createLobby from './mutations/createLobby';
import startLobby from './mutations/startGame';
import GameTokenData from '../types/gameToken';
import pubsub from './gamePubSub';
import submitAnswer from './mutations/submitAnswer';
import getLobby from './queries/getLobby';

const resolvers = {
    Query: { getLobby },
    Mutation: { joinLobby, createLobby, startLobby, submitAnswer },
    Subscription: {
        onGameEvent: {
            subscribe: async (_parent: void, { game_token }: { game_token: string }) => {
                const { code } = jwt.decode(game_token) as GameTokenData;
                return pubsub.asyncIterator(`GAME_EVENT_${code}`);
            },
        },
    },
};

export default resolvers;
