import jwt from 'jsonwebtoken';
import { ResolverContext } from '../../pages/api/graphql';
import GameTokenData from '../../types/gameTokenData';
import { verifyJwt } from '../../utils/jwt';

const startLobby = async (_parent: void, { game_token }: { game_token: string }, { pubs }: ResolverContext): Promise<boolean> => {
    if (!(await verifyJwt(game_token))) return false;

    const { isHost, code } = jwt.decode(game_token) as GameTokenData;
    if (!isHost) return false;

    pubs.startGamePub.pub({ lobbyId: code });

    return true;
};

export default startLobby;
