import getClient from '../db/client';
import { getPublishers } from '../db/jobScheduler/schedulers';
import { publish } from '../graphql/gamePubSub';
import Question from '../types/question';

const MIN_SCORE = 500;
const MAX_SCORE = 1000;

const calculateScore = (additionalScorePercentage: number): number => {
    if (additionalScorePercentage > 0.8) additionalScorePercentage = 1;
    if (additionalScorePercentage < 0.2) additionalScorePercentage = 0;

    return (MAX_SCORE - MIN_SCORE) * additionalScorePercentage + MIN_SCORE;
};

const UPDATE_SCORE = (values: string) => `
    UPDATE players p 
    SET score = score + add_score, answers = answers + 1
    FROM (VALUES ${values}) AS v(username, add_score) 
    WHERE p.username = v.username AND lobby_id = $1;
`;

type Answer = {
    username: string;
    answers: number[];
    answered_at: Date;
};

const generateUpdateScoreQuery = (question: Question, finishTime: number, answers: Answer[]): string | undefined => {
    const scoreToAdd: { username: string; addScore: number }[] = [];

    answers.forEach(({ username, answers, answered_at }) => {
        if (question.answers.length !== answers.length || answered_at > new Date(finishTime)) return;
        for (const answer of answers) if (!question.answers.includes(Number(answer))) return;

        const timeLeftPercentage = (finishTime - answered_at.getTime()) / (question.time * 1000);

        scoreToAdd.push({ username, addScore: calculateScore(timeLeftPercentage) });
    });

    if (scoreToAdd.length === 0) return;
    const scoreToAddValuesString = scoreToAdd.map(({ username, addScore }) => `('${username}', ${addScore})`).join(', ');

    return UPDATE_SCORE(scoreToAddValuesString);
};

const GET_ANSWERS = `SELECT * FROM answers WHERE lobby_id = $1 AND question_id = $2;`;

const GET_SCORE = `SELECT username, score FROM players WHERE lobby_id = $1;`;

type ShowAnswerData = {
    lobbyId: string;
    finishTime: number;
    questions: Question[];
};

const showAnswer = async ({ lobbyId, questions, finishTime }: ShowAnswerData) => {
    try {
        const client = await getClient();

        const question = questions.shift();
        if (!question) return;

        const getAnswersResponse = await client.query(GET_ANSWERS, [lobbyId, question.id]);
        const answers = getAnswersResponse.rows;

        const updateScoreQuery = generateUpdateScoreQuery(question, finishTime, answers);
        if (updateScoreQuery) await client.query(updateScoreQuery, [lobbyId]);

        const getScoreResponse = await client.query(GET_SCORE, [lobbyId]);
        const points = getScoreResponse.rows;

        publish(lobbyId, { event: 'SHOW_ANSWER', data: { question, points } });

        const nextEventDate = new Date(Date.now() + 10 * 1000);
        const isLastQuestion = questions.length === 0;

        if (isLastQuestion) {
            const questionNum = question.index + 1;
            await getPublishers().endGamePub.pub({ lobbyId, questionNum }, nextEventDate);
        } else {
            await getPublishers().showQuestionPub.pub({ lobbyId, questions }, nextEventDate);
        }
    } catch (error) {
        console.error('showAnswer', error);
    }
};

export default showAnswer;
