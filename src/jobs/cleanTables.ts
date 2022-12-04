import getClient from '../db/client';
import { JOB_SCHEDULER_SCHEMA, jobSchedulerTables, getPublishers } from '../db/jobScheduler/schedulers';

const DELETE_FINISHED_JOBS = () => {
    let query = 'WITH ';
    let name = '';

    jobSchedulerTables.forEach((table, i, arr) => {
        const isLast = i === arr.length - 1;

        if (!isLast) {
            if (i > 0) query += ', ';
            name += '_';
            query += name + ' AS (';
        }

        query += `DELETE FROM "${JOB_SCHEDULER_SCHEMA}"."${table}" WHERE taken_until = 'infinity'`;

        if (!isLast) query += ')';
    });

    return query;
};

const DELETE_FINISHED_LOBBIES = `
    WITH lobbies_to_delete AS (
        SELECT code
        FROM lobbies
        WHERE state = 'CLOSED'
        LIMIT 5000
    ), delete_lobbies AS (
        DELETE FROM lobbies
        WHERE code = ANY(ARRAY(SELECT * FROM lobbies_to_delete))
    ), delete_answers AS (
        DELETE FROM answers
        WHERE lobby_id = ANY(ARRAY(SELECT * FROM lobbies_to_delete))
    )
    DELETE FROM players
    WHERE lobby_id = ANY(ARRAY(SELECT * FROM lobbies_to_delete));
`;

const cleanTables = async () => {
    const db = await getClient();

    try {
        await db.query(DELETE_FINISHED_JOBS());
        await db.query(DELETE_FINISHED_LOBBIES);
    } catch (e) {
        console.error(e);
    }

    scheduleCleanTablesJob();
};

export const scheduleCleanTablesJob = () => getPublishers().cleanTablesPub.pub(null, new Date(Date.now() + 10 * 60 * 1000));

export default cleanTables;
