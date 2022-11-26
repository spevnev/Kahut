import Game from '../../types/game';
import { ResolverContext } from '../apolloServer';

const GET_GAME = `
    SELECT g.*, questions
    FROM (
        SELECT
            game_id,
            JSONB_AGG(TO_JSONB(q.*)) AS questions
        FROM questions AS q
        WHERE game_id = $1
        GROUP BY game_id
    ) AS questions
    RIGHT JOIN games g ON game_id = id
    WHERE id = $1;
`;
const getGame = async (_parent: void, { id }: { id: string }, { db }: ResolverContext): Promise<null | Game> => {
    const res = await db.query(GET_GAME, [id]);

    if (res.rowCount !== 1) return null;
    const game = res.rows[0] as Game;

    if (!game.questions) game.questions = [];
    else game.questions.sort((a, b) => a.index - b.index);

    return game;
};

export default getGame;
