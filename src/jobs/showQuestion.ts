import { getPublishers } from '../db/jobScheduler/schedulers';
import { publish } from '../graphql/gamePubSub';
import { Question } from '../types/gameData';

const showQuestion = async ({ lobbyId, questions }: { lobbyId: string; questions: Question[] }) => {
    const question = questions[0];

    publish(lobbyId, { event: 'SHOW_QUESTION', data: { ...question, answers: undefined } });

    const finishTime = Date.now() + question.time * 1000;
    await getPublishers().showAnswerPub.pub({ lobbyId, questions, finishTime }, new Date(finishTime));
};

export default showQuestion;
