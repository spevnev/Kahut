import { createJwt } from '../../utils/jwt';
import { ResolverContext } from '../apolloServer';

export const GAME_TOKEN_DURATION = 60 * 45; // 45m

export const JOIN_LOBBY = `INSERT INTO players(username, picture, code) VALUES ($1, $2, $3) ON CONFLICT DO NOTHING;`;

type JoinLobbyArgs = {
    username: string;
    picture: string | null;
    code: string;
};

const joinLobby = async (_parent: void, { username, code, picture }: JoinLobbyArgs, { db }: ResolverContext): Promise<string | null> => {
    if (code.length !== 6 || username.length < 1 || username.length > 256) return null;

    const res = await db.query(JOIN_LOBBY, [username, picture, code]);
    if (res.rowCount === 0) return null;

    return createJwt({ username, picture, code, isHost: false }, GAME_TOKEN_DURATION);
};

export default joinLobby;
