import getClient from '../db/client';
import { getPublishers } from '../db/jobScheduler/schedulers';
import { publish } from '../graphql/gamePubSub';

const startGame = async ({ lobbyId }: { lobbyId: string }) => {
    const client = await getClient();

    const getGameRes = await client.query(`SELECT g.* FROM games g INNER JOIN lobbies l ON g.id = l.game_id WHERE l.code = $1;`, [lobbyId]);
    const { id, title, image } = getGameRes.rows[0];

    const getQuestionsRes = await client.query(`SELECT id, title, image, type, time, choices, answers FROM questions WHERE game_id = $1;`, [id]);
    const questions = getQuestionsRes.rows;

    // TODO: mark lobby closed + check if already closed = don't start + error

    publish(lobbyId, { event: 'START_GAME', data: { title, image } });

    await getPublishers().showQuestionPub.pub({ lobbyId, gameId: id, questions }, new Date(Date.now() + 5 * 1000));
};

export default startGame;
