import getClient from '../db/client';
import { getPublishers } from '../db/jobScheduler/schedulers';
import { publish } from '../graphql/gamePubSub';

const CLOSE_LOBBY_AND_GET_GAME = `
    WITH close_lobby AS (
        UPDATE lobbies
        SET state = 'INGAME'
        WHERE code = $1 AND state = 'OPEN';
    )
    SELECT title, image, game_questions
    FROM (
        SELECT
            game_id,
            JSONB_AGG(TO_JSONB(questions.*)) AS game_questions
        FROM questions
        WHERE game_id = (SELECT game_id FROM lobbies WHERE code = $1)
        GROUP BY game_id
    ) AS game_questions
    INNER JOIN games ON game_id = id;
`;

const startGame = async ({ lobbyId }: { lobbyId: string }) => {
    const client = await getClient();

    const res = await client.query(CLOSE_LOBBY_AND_GET_GAME, [lobbyId]);
    const { title, image, game_questions } = res.rows[0];
    const questions = (game_questions as any[]).map((question, index) => ({ ...question, index }));

    publish(lobbyId, { event: 'START_GAME', data: { title, image } });

    await getPublishers().showQuestionPub.pub({ lobbyId, questions }, new Date(Date.now() + 5 * 1000));
};

export default startGame;
