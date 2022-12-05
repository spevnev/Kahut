import jwt from 'jsonwebtoken';
import GameTokenData from '../../types/gameTokenData';
import { verifyJwt } from '../../utils/jwt';
import { ResolverContext } from '../../pages/api/graphql';

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

    const response = await db.query(GET_LOBBY_INFO, [code]);

    if (response.rowCount === 0) return null;
    const { state, players } = response.rows[0];

    return { state, players: players.map(({ username }: { username: string }) => username) };
};

export default getLobby;
