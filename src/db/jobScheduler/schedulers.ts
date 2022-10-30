import Subscriber from './subscriber';
import startGame from '../../jobs/startGame';
import showQuestion from '../../jobs/showQuestion';
import showAnswer from '../../jobs/showAnswer';
import endGame from '../../jobs/endGame';
import Publisher from './publisher';
import { ClientConfig } from 'pg';

const SCHEMA = 'job_schedulers';

const START_GAME = 'jobs_start-game';
const SHOW_QUESTION = 'jobs_show-question';
const SHOW_ANSWER = 'jobs_show-answer';
const END_GAME = 'jobs_end-game';

const CONNECTION_CONFIG: ClientConfig = {};

export type Publishers = {
    startGamePub: Publisher;
    showQuestionPub: Publisher;
    showAnswerPub: Publisher;
    endGamePub: Publisher;
};

export const getPublishers = (): Publishers => {
    if (!CONNECTION_CONFIG.connectionString) CONNECTION_CONFIG.connectionString = process.env.DB_CONNECTION_STRING;

    return {
        startGamePub: new Publisher(START_GAME, CONNECTION_CONFIG, {}, SCHEMA),
        showQuestionPub: new Publisher(SHOW_QUESTION, CONNECTION_CONFIG, {}, SCHEMA),
        showAnswerPub: new Publisher(SHOW_ANSWER, CONNECTION_CONFIG, {}, SCHEMA),
        endGamePub: new Publisher(END_GAME, CONNECTION_CONFIG, {}, SCHEMA),
    };
};

export const initSubscribers = (): void => {
    if (!CONNECTION_CONFIG.connectionString) CONNECTION_CONFIG.connectionString = process.env.DB_CONNECTION_STRING;

    new Subscriber(startGame, START_GAME, CONNECTION_CONFIG, {}, SCHEMA).sub();
    new Subscriber(showQuestion, SHOW_QUESTION, CONNECTION_CONFIG, {}, SCHEMA).sub();
    new Subscriber(showAnswer, SHOW_ANSWER, CONNECTION_CONFIG, {}, SCHEMA).sub();
    new Subscriber(endGame, END_GAME, CONNECTION_CONFIG, {}, SCHEMA).sub();
};
