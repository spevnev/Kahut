import { ClientConfig } from 'pg';
import Subscriber from './subscriber';
import Publisher from './publisher';
import startGame from '../../jobs/startGame';
import showQuestion from '../../jobs/showQuestion';
import showAnswer from '../../jobs/showAnswer';
import endGame from '../../jobs/endGame';
import cleanTables, { scheduleCleanTablesJob } from '../../jobs/cleanTables';

export const JOB_SCHEDULER_SCHEMA = 'job_schedulers';

const DELETE_TABLES = 'delete-tables';
const START_GAME = 'jobs_start-game';
const SHOW_QUESTION = 'jobs_show-question';
const SHOW_ANSWER = 'jobs_show-answer';
const END_GAME = 'jobs_end-game';
export const jobSchedulerTables = [START_GAME, SHOW_QUESTION, SHOW_ANSWER, END_GAME, DELETE_TABLES];

const CONNECTION_CONFIG: ClientConfig = {};

export type Publishers = {
    cleanTablesPub: Publisher;
    startGamePub: Publisher;
    showQuestionPub: Publisher;
    showAnswerPub: Publisher;
    endGamePub: Publisher;
};

let publishers: Publishers;
export const getPublishers = (): Publishers => {
    if (!publishers) {
        if (!CONNECTION_CONFIG.connectionString) CONNECTION_CONFIG.connectionString = process.env.DB_CONNECTION_STRING;

        publishers = {
            cleanTablesPub: new Publisher(DELETE_TABLES, CONNECTION_CONFIG, {}, JOB_SCHEDULER_SCHEMA),
            startGamePub: new Publisher(START_GAME, CONNECTION_CONFIG, {}, JOB_SCHEDULER_SCHEMA),
            showQuestionPub: new Publisher(SHOW_QUESTION, CONNECTION_CONFIG, {}, JOB_SCHEDULER_SCHEMA),
            showAnswerPub: new Publisher(SHOW_ANSWER, CONNECTION_CONFIG, {}, JOB_SCHEDULER_SCHEMA),
            endGamePub: new Publisher(END_GAME, CONNECTION_CONFIG, {}, JOB_SCHEDULER_SCHEMA),
        };
    }

    return publishers;
};

export const initSubscribers = (): void => {
    if (!CONNECTION_CONFIG.connectionString) CONNECTION_CONFIG.connectionString = process.env.DB_CONNECTION_STRING;

    new Subscriber(startGame, START_GAME, CONNECTION_CONFIG, {}, JOB_SCHEDULER_SCHEMA).sub();
    new Subscriber(showQuestion, SHOW_QUESTION, CONNECTION_CONFIG, {}, JOB_SCHEDULER_SCHEMA).sub();
    new Subscriber(showAnswer, SHOW_ANSWER, CONNECTION_CONFIG, {}, JOB_SCHEDULER_SCHEMA).sub();
    new Subscriber(endGame, END_GAME, CONNECTION_CONFIG, {}, JOB_SCHEDULER_SCHEMA).sub();
    new Subscriber(cleanTables, DELETE_TABLES, CONNECTION_CONFIG, { poll_delay: 60 * 1000 }, JOB_SCHEDULER_SCHEMA).sub();

    scheduleCleanTablesJob();
};
