import getClient from '../db/client';
import { getPublishers } from '../db/jobScheduler/schedulers';
import { publish } from '../graphql/gamePubSub';
import Question from '../types/question';

const CLOSE_LOBBY_AND_GET_GAME = `
    WITH close_lobby AS (
        UPDATE lobbies
        SET state = 'INGAME'
        WHERE code = $1 AND state = 'OPEN'
    )
    SELECT title, image, questions
    FROM (
        SELECT
            game_id,
            JSONB_AGG(TO_JSONB(q.*)) AS questions
        FROM questions q
        WHERE game_id = (SELECT game_id FROM lobbies WHERE code = $1)
        GROUP BY game_id
    ) AS questions
    INNER JOIN games ON game_id = id;
`;

const startGame = async ({ lobbyId }: { lobbyId: string }) => {
    const client = await getClient();

    const res = await client.query(CLOSE_LOBBY_AND_GET_GAME, [lobbyId]);
    const { title, image, questions } = res.rows[0] as { title: string; image: string; questions: Question[] };
    questions.sort((a, b) => a.index - b.index);

    publish(lobbyId, { event: 'START_GAME', data: { title, image } });

    await getPublishers().showQuestionPub.pub({ lobbyId, questions }, new Date(Date.now() + 5 * 1000));
};

export default startGame;
