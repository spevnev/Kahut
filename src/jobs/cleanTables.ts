import getClient from '../db/client';
import { JOB_SCHEDULER_SCHEMA, jobSchedulerTables, getPublishers } from '../db/jobScheduler/schedulers';

const CLEAN_TABLES_INTERVAL_MS = 60 * 1000;

const DELETE_FINISHED_JOBS = () => {
    let query = 'WITH ';
    let name = '_';

    const lastIndex = jobSchedulerTables.length - 1;
    jobSchedulerTables.forEach((table, index) => {
        if (index < lastIndex) query += name + ' AS (';

        query += `DELETE FROM "${JOB_SCHEDULER_SCHEMA}"."${table}" WHERE taken_until = 'infinity'`;
        name += '_';

        if (index < lastIndex) query += ')';
        if (index + 1 < lastIndex) query += ', ';
    });

    return query;
};

const DELETE_FINISHED_LOBBIES = `
    WITH lobbies_to_delete AS (
        SELECT code
        FROM lobbies
        WHERE state = 'CLOSED'
        LIMIT 100
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
    const client = await getClient();

    try {
        await client.query(DELETE_FINISHED_JOBS());
        await client.query(DELETE_FINISHED_LOBBIES);
    } catch (error) {
        console.error(error);
    }

    scheduleCleanTablesJob();
};

export const scheduleCleanTablesJob = () => getPublishers().cleanTablesPub.pub(null, new Date(Date.now() + CLEAN_TABLES_INTERVAL_MS));

export default cleanTables;
