import GameInfo from '../../types/gameInfo';
import { ResolverContext } from '../../pages/api/graphql';

const GET_GAMES = (orderBy: string, sortingOrder: string, lastId?: string, lastValue?: string, creator?: string, prompt?: string) => {
    let compareLastIdStatement = '';
    if (lastId) compareLastIdStatement = `AND id > '${lastId}'`;

    let compareLastValueStatement = '';
    if (lastValue) {
        const typeCastedLastValue = orderBy === 'created_at' ? `TO_TIMESTAMP(${lastValue.slice(0, -3)})` : `${lastValue}::INT`;
        compareLastValueStatement = `AND ${orderBy} ${sortingOrder === 'ASC' ? '>=' : '<='} ${typeCastedLastValue}`;
    }

    let compareCreatorStatement = '';
    if (creator) compareCreatorStatement = `AND creator = '${creator}'`;

    let compareTitleStatement = '';
    if (prompt) compareTitleStatement = `AND title LIKE '${prompt}'`;

    return `
        SELECT * FROM games 
        WHERE question_num > $1 ${compareTitleStatement} ${compareLastIdStatement} ${compareLastValueStatement} ${compareCreatorStatement}
        ORDER BY ${orderBy} ${sortingOrder}, id ASC
        LIMIT $2;
    `;
};

type GetGamesArgs = {
    limit: number;
    orderBy: string;
    questionNum: number;
    sortingOrder: string;
    lastId?: string;
    lastValue?: string;
    creator?: string;
    prompt?: string;
};

const getGames = async (
    _parent: void,
    { limit, orderBy, questionNum, sortingOrder, lastId, lastValue, creator, prompt }: GetGamesArgs,
    { db }: ResolverContext
): Promise<GameInfo[]> => {
    if (limit > 100) limit = 100;
    if (prompt) prompt += '%';

    if (orderBy !== 'players' && orderBy !== 'created_at' && orderBy !== 'question_num') return [];
    if (sortingOrder !== 'ASC' && sortingOrder !== 'DESC') return [];

    if (lastValue && orderBy === 'question_num') {
        questionNum = Number(lastValue);
        lastValue = '';
    }

    const response = await db.query(GET_GAMES(orderBy, sortingOrder, lastId, lastValue, creator, prompt), [questionNum, limit]);
    return response.rows;
};

export default getGames;
