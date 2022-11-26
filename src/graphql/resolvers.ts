import jwt from 'jsonwebtoken';
import pubsub from './gamePubSub';
import GameTokenData from '../types/gameTokenData';
import getLobby from './queries/getLobby';
import getGame from './queries/getGame';
import canEditGame from './queries/canEditGame';
import createLobby from './mutations/createLobby';
import joinLobby from './mutations/joinLobby';
import startLobby from './mutations/startGame';
import submitAnswer from './mutations/submitAnswer';
import editGame from './mutations/editGame';
import deleteGame from './mutations/deleteGame';
import editQuestion from './mutations/editQuestion';
import deleteQuestion from './mutations/deleteQuestion';

const resolvers = {
    Query: { getLobby, getGame, canEditGame },
    Mutation: { joinLobby, createLobby, startLobby, submitAnswer, editGame, deleteGame, editQuestion, deleteQuestion },
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
