import getClient from '../db/client';
import { getPublishers } from '../db/jobScheduler/schedulers';
import { Question } from '../types/gameData';

// TODO:
const GET_ANSWERS = `SELECT `;

// TODO:
const UPDATE_SCORE = ``;

const showAnswer = async ({ lobbyId, questions, finishTime }: { lobbyId: string; finishTime: number; questions: Question[] }) => {
    const client = await getClient();
    const question = questions.shift();

    // const getAnswersRes = await client.query(GET_ANSWERS, []);
    // console.log(getAnswersRes);

    //! compare to finishTime + compare answers

    // const updateScoreRes = await client.query(UPDATE_SCORE, []);
    // console.log(updateScoreRes);

    // publish(lobbyId, { event: 'SHOW_ANSWER', data: { answers, points } });

    const nextEventDate = new Date(Date.now() + 10 * 1000);
    if (questions.length === 0) await getPublishers().endGamePub.pub({}, nextEventDate);
    else await getPublishers().showQuestionPub.pub({ lobbyId, questions }, nextEventDate);
};

export default showAnswer;
