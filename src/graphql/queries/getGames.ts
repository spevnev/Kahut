import GameInfo from '../../types/gameInfo';
import { ResolverContext } from '../apolloServer';

// TODO: after + order by ?
const GET_GAMES = `
    SELECT * 
    FROM games 
    WHERE id > $1
    ORDER BY id ASC 
    LIMIT $2;
`;

type GetGamesArgs = {
    after: string;
    limit: number;
};

const getGames = async (_parent: void, { after, limit }: GetGamesArgs, { db }: ResolverContext): Promise<GameInfo[]> => {
    limit = Math.min(limit, 100);

    const res = await db.query(GET_GAMES, [after || '00000000-0000-0000-0000-000000000000', limit]);
    return res.rows;
};

export default getGames;
