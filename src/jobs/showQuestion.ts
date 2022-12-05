import { getPublishers } from '../db/jobScheduler/schedulers';
import { publish } from '../graphql/gamePubSub';
import Question from '../types/question';

const SHOW_QUESTION_PROMPT_MS = 3 * 1000;

type ShowQuestionData = {
    lobbyId: string;
    questions: Question[];
};

const showQuestion = async ({ lobbyId, questions }: ShowQuestionData) => {
    try {
        const question = questions[0];

        publish(lobbyId, { event: 'SHOW_QUESTION', data: { ...question, answers: undefined } });

        const finishTime = Date.now() + question.time * 1000 + SHOW_QUESTION_PROMPT_MS;
        await getPublishers().showAnswerPub.pub({ lobbyId, questions, finishTime }, new Date(finishTime));
    } catch (error) {
        console.error('showQuestion', error);
    }
};

export default showQuestion;
