import getClient from '../db/client';
import { getPublishers } from '../db/jobScheduler/schedulers';
import { publish } from '../graphql/gamePubSub';
import { Question } from '../types/gameData';

const MAX_SCORE = 1000;
const MIN_SCORE = 500;

const GET_ANSWERS = `SELECT * FROM answers WHERE lobby_id = $1 AND question_id = $2;`;

const UPDATE_SCORE = (values: string) => `
    UPDATE players p 
    SET score = score + add_score, answers = answers + 1
    FROM (VALUES ${values}) AS v(username, add_score) 
    WHERE p.username = v.username AND lobby_id = $1
`;

const GET_SCORE = `SELECT username, score FROM players WHERE lobby_id = $1;`;

const showAnswer = async ({ lobbyId, questions, finishTime }: { lobbyId: string; finishTime: Date; questions: Question[] }) => {
    finishTime = new Date(finishTime);

    const question = questions.shift();
    if (!question) throw new Error();

    const client = await getClient();
    const getAnswersRes = await client.query(GET_ANSWERS, [lobbyId, question.id]);

    const addScore: { username: string; addScore: number }[] = [];
    getAnswersRes.rows.forEach(({ username, answers, answered_at }: { username: string; answers: number[]; answered_at: Date }) => {
        if (answered_at > finishTime || question.answers.length !== answers.length) return;
        for (const answer of answers) if (!question.answers.includes(Number(answer))) return;

        let timeLeftPercentage = (finishTime.getTime() - answered_at.getTime()) / (question.time * 1000);
        if (timeLeftPercentage > 0.9) timeLeftPercentage = 1;
        if (timeLeftPercentage < 0.2) timeLeftPercentage = 0;

        addScore.push({ username, addScore: (MAX_SCORE - MIN_SCORE) * timeLeftPercentage + MIN_SCORE });
    });

    const values = addScore.map(({ username, addScore }) => `('${username}', ${addScore})`);
    if (values.length > 0) await client.query(UPDATE_SCORE(values.join(', ')), [lobbyId]);

    const getScoreRes = await client.query(GET_SCORE, [lobbyId]);
    publish(lobbyId, { event: 'SHOW_ANSWER', data: { question, points: getScoreRes.rows } });

    const nextEventDate = new Date(Date.now() + 10 * 1000);
    if (questions.length === 0) await getPublishers().endGamePub.pub({ lobbyId, questionsNum: question.index + 1 }, nextEventDate);
    else await getPublishers().showQuestionPub.pub({ lobbyId, questions }, nextEventDate);
};

export default showAnswer;
