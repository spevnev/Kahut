import jwt from 'jsonwebtoken';
import GameTokenData from '../../types/gameToken';
import { verifyJwt } from '../../utils/jwt';
import { ResolverContext } from '../apolloServer';

const startLobby = async (_parent: void, { game_token }: { game_token: string }, { pubs: { startGamePub } }: ResolverContext): Promise<boolean> => {
    if (!(await verifyJwt(game_token))) return false;

    const { isHost, code } = jwt.decode(game_token) as GameTokenData;
    if (!isHost) return false;

    startGamePub.pub({ lobbyId: code });

    return true;
};

export default startLobby;
