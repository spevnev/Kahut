import getClient from '../db/client';
import { getPublishers } from '../db/jobScheduler/schedulers';
import { publish } from '../graphql/gamePubSub';

const GET_GAME = `
    SELECT g.* FROM games g 
    INNER JOIN lobbies l ON g.id = l.game_id 
    WHERE l.code = $1;
`;

const GET_QUESTIONS = `
    SELECT id, title, image, type, time, choices, answers 
    FROM questions 
    WHERE game_id = $1;
`;

const CLOSE_LOBBY = `
    UPDATE lobbies 
    SET state = 'INGAME' 
    WHERE code = $1 AND state = 'OPEN';
`;

const startGame = async ({ lobbyId }: { lobbyId: string }) => {
    const client = await getClient();

    const getGameRes = await client.query(GET_GAME, [lobbyId]);
    const { id, title, image } = getGameRes.rows[0];

    const getQuestionsRes = await client.query(GET_QUESTIONS, [id]);
    const questions = getQuestionsRes.rows.map((question, index) => ({ ...question, index }));

    await client.query(CLOSE_LOBBY, [lobbyId]);

    publish(lobbyId, { event: 'START_GAME', data: { title, image } });

    await getPublishers().showQuestionPub.pub({ lobbyId, questions }, new Date(Date.now() + 5 * 1000));
};

export default startGame;
