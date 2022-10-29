import jwt from 'jsonwebtoken';
import User from '../../types/user';
import { createJwt, verifyJwt } from '../../utils/jwt';
import { GAME_TOKEN_DURATION, ResolverContext } from '../resolvers';
import { JOIN_LOBBY } from './joinLobby';

const CREATE_LOBBY = `INSERT INTO lobbies(host, game_id) VALUES ($1, $2) ON CONFLICT DO NOTHING RETURNING code;`;

const createLobby = async (
    _parent: any,
    { token, game_id }: { token: string; game_id: string },
    { db }: ResolverContext,
    _info: any
): Promise<{ token: string | null; code: string | null }> => {
    if (!(await verifyJwt(token))) return { token: null, code: null };
    const { name, email, picture } = jwt.decode(token) as User;

    const res = await db.query(CREATE_LOBBY, [email, game_id]);
    const code = res.rowCount === 1 ? res.rows[0].code : null;
    if (!code) return { token: null, code: null };

    await db.query(JOIN_LOBBY, [name, picture, code]);

    const game_token = await createJwt({ username: name, code }, GAME_TOKEN_DURATION);
    return { code, token: game_token };
};

export default createLobby;
