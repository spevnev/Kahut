import GameInfo from '../../types/gameInfo';
import { ResolverContext } from '../apolloServer';

const GET_GAMES = (orderBy: string, sortingOrder: string, lastId?: string, lastValue?: any, creator?: string) => `
    SELECT * 
    FROM games 
    WHERE
        ${lastId ? `id > '${lastId}' AND` : ''}
        ${lastValue ? `${orderBy} ${sortingOrder === 'ASC' ? '>=' : '<='} ${orderBy === 'created_at' ? `TO_TIMESTAMP(${lastValue.slice(0, -3)})` : `${lastValue}::INT`} AND` : ''}
        ${creator ? `creator = '${creator}' AND` : ''}
        question_num > $1 AND
        ($2 = '' OR title LIKE $2)
    ORDER BY ${orderBy} ${sortingOrder}, id ASC
    LIMIT $3;
`;

type GetGamesArgs = {
    limit: number;
    orderBy: string;
    questionNum: number;
    sortingOrder: string;
    lastId?: string;
    lastValue?: string | number;
    creator?: string;
    prompt?: string;
};

const getGames = async (
    _parent: void,
    { limit, orderBy, questionNum, sortingOrder, lastId, lastValue, creator, prompt }: GetGamesArgs,
    { db }: ResolverContext
): Promise<GameInfo[]> => {
    if (limit > 100) limit = 100;
    prompt = prompt ? `${prompt}%` : '';

    if (orderBy !== 'players' && orderBy !== 'created_at' && orderBy !== 'question_num') return [];
    if (sortingOrder !== 'ASC' && sortingOrder !== 'DESC') return [];

    const res = await db.query(GET_GAMES(orderBy, sortingOrder, lastId, lastValue, creator), [questionNum, prompt, limit]);
    return res.rows;
};

export default getGames;
