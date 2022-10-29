import { createJwt } from '../../utils/jwt';
import { GAME_TOKEN_DURATION, ResolverContext } from '../resolvers';

export const JOIN_LOBBY = `INSERT INTO players(username, picture, game_id) VALUES ($1, $2, $3) ON CONFLICT DO NOTHING;`;

const joinLobby = async (
    _parent: any,
    { username, code, picture }: { username: string; picture: string | null; code: string },
    { db }: ResolverContext,
    _info: any
): Promise<string | null> => {
    if (code.length !== 6 || username.length < 1 || username.length > 256) return null;

    const res = await db.query(JOIN_LOBBY, [username, picture, code]);
    if (res.rowCount === 0) return null;

    return createJwt({ username, code }, GAME_TOKEN_DURATION);
};

export default joinLobby;
