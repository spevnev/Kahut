import jwt from 'jsonwebtoken';
import GameTokenData from '../../types/gameTokenData';
import { verifyJwt } from '../../utils/jwt';
import { ResolverContext } from '../apolloServer';

type StartLobbyArgs = { game_token: string };

const startLobby = async (_parent: void, { game_token }: StartLobbyArgs, { pubs: { startGamePub } }: ResolverContext): Promise<boolean> => {
    if (!(await verifyJwt(game_token))) return false;

    const { isHost, code } = jwt.decode(game_token) as GameTokenData;
    if (!isHost) return false;

    startGamePub.pub({ lobbyId: code });

    return true;
};

export default startLobby;
