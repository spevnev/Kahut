import jwt from 'jsonwebtoken';
import GameTokenData from '../../types/gameToken';
import Player from '../../types/player';
import { verifyJwt } from '../../utils/jwt';
import { ResolverContext } from '../apolloServer';

const getPlayers = async (_parent: void, { game_token }: { game_token: string }, { db }: ResolverContext): Promise<Player[] | null> => {
    if (!(await verifyJwt(game_token))) return null;
    const { code } = jwt.decode(game_token) as GameTokenData;

    const { rows } = await db.query(`SELECT username, picture FROM players WHERE code = $1;`, [code]);
    return rows;
};

export default getPlayers;
