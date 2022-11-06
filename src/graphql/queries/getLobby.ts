import jwt from 'jsonwebtoken';
import GameTokenData from '../../types/gameToken';
import Player from '../../types/player';
import { verifyJwt } from '../../utils/jwt';
import { ResolverContext } from '../apolloServer';

const GET_LOBBY_INFO = `
    SELECT state, TO_JSON(ARRAY_AGG(p)) as players
    FROM lobbies l
    INNER JOIN players p
    ON code = p.lobby_id
    WHERE code = $1
    GROUP BY state;
`;

type GetLobbyResponse = null | {
    players: Player[];
    state: string;
};

const getLobby = async (_parent: void, { game_token }: { game_token: string }, { db }: ResolverContext): Promise<GetLobbyResponse> => {
    if (!(await verifyJwt(game_token))) return null;
    const { code } = jwt.decode(game_token) as GameTokenData;

    const res = await db.query(GET_LOBBY_INFO, [code]);
    const { state, players } = res.rows[0];

    return { state, players: players.map(({ username, picture }: Player) => ({ username, picture })) };
};

export default getLobby;
