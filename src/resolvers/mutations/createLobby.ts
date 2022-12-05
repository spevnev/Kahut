import jwt from 'jsonwebtoken';
import { ResolverContext } from '../../pages/api/graphql';
import User from '../../types/user';
import { createJwt, verifyJwt } from '../../utils/jwt';
import { GAME_TOKEN_DURATION, JOIN_LOBBY } from './joinLobby';

const CREATE_LOBBY = `
    INSERT INTO lobbies(game_id)
    VALUES ($1)
    ON CONFLICT DO NOTHING
    RETURNING code;
`;

type CreateLobbyArgs = {
    token: string;
    game_id: string;
};

type CreateLobbyResponse = {
    token: string | null;
    code: string | null;
};

const createLobby = async (_parent: void, { token, game_id }: CreateLobbyArgs, { db }: ResolverContext): Promise<CreateLobbyResponse> => {
    if (!(await verifyJwt(token))) return { token: null, code: null };
    const { name } = jwt.decode(token) as User;

    const response = await db.query(CREATE_LOBBY, [game_id]);

    if (response.rowCount !== 1) return { token: null, code: null };
    const code = response.rows[0].code;

    await db.query(JOIN_LOBBY, [name, code]);

    const game_token = await createJwt({ username: name, code, isHost: true }, GAME_TOKEN_DURATION);
    return { code, token: game_token };
};

export default createLobby;
