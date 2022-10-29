import jwt from 'jsonwebtoken';
import { verifyJwt } from '../../utils/jwt';

const startLobby = async (_parent: void, { code, game_token }: { code: string; game_token: string }): Promise<boolean> => {
    if (!(await verifyJwt(game_token))) return false;

    const { isHost } = jwt.decode(game_token) as { isHost: boolean };
    if (!isHost) return false;

    // TODO: publish start job

    return true;
};

export default startLobby;