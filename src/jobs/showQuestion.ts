import getClient from '../db/client';
import { getPublishers } from '../db/jobScheduler/schedulers';
import { publish } from '../graphql/gamePubSub';

const showQuestion = async ({ lobbyId, gameId, idx }: { lobbyId: string; gameId: string; idx: number }) => {
    const client = await getClient();

    const res = await client.query(`SELECT * FROM questions q INNER JOIN games g ON q.game_id = g.id WHERE g.id = $1 ORDER BY order_id;`, [gameId]);
    const data = res.rows[idx];
    console.log(data);

    publish(lobbyId, { event: 'QUESTION', data: { question: data } });

    const finishTime = Date.now() + data.time * 1000;
    await getPublishers().showAnswerPub.pub({ lobbyId, answers: data.answers, idx, finishTime }, new Date(finishTime));
};

export default showQuestion;
