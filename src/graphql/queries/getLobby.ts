import jwt from 'jsonwebtoken';
import GameTokenData from '../../types/gameTokenData';
import { verifyJwt } from '../../utils/jwt';
import { ResolverContext } from '../apolloServer';

const GET_LOBBY_INFO = `
    SELECT state, TO_JSON(ARRAY_AGG(p)) AS players
    FROM lobbies l
    INNER JOIN players p
    ON code = p.lobby_id
    WHERE code = $1
    GROUP BY state;
`;

type GetLobbyResponse = null | {
    players: string[];
    state: string;
};

const getLobby = async (_parent: void, { game_token }: { game_token: string }, { db }: ResolverContext): Promise<GetLobbyResponse> => {
    if (!(await verifyJwt(game_token))) return null;
    const { code } = jwt.decode(game_token) as GameTokenData;

    const res = await db.query(GET_LOBBY_INFO, [code]);
    if (res.rowCount === 0) return null;
    const { state, players } = res.rows[0];

    return { state, players: players.map(({ username }: { username: string }) => username) };
};

export default getLobby;
