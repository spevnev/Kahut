import { DBClient } from './client';

const initDB = async (client: DBClient) => {
    try {
        await client.query(`CREATE EXTENSION IF NOT EXISTS "uuid-ossp";`, []);

        // await client.query(
        //     `CREATE TABLE IF NOT EXISTS lobbies(
        // code TEXT NOT NULL UNIQUE,
        //     );`,
        //     []
        // );
        // await client.query(`CREATE INDEX IF NOT EXISTS _idx ON  ()`, []);

        await client.query(
            `CREATE TABLE IF NOT EXISTS players(
                picture  TEXT DEFAULT(null),
                username TEXT NOT NULL,
                score    INT  DEFAULT(0),
                game_id  TEXT NOT NULL
            );`,
            []
        );
        await client.query(`CREATE UNIQUE INDEX IF NOT EXISTS players_idx ON players (game_id, username)`, []);

        // await client.query(
        //     `CREATE TABLE IF NOT EXISTS games(
        //         uuid        UUID NOT NULL UNIQUE,
        //         title       TEXT NOT NULL,
        //         description TEXT NOT NULL,
        //         image       TEXT NOT NULL
        //     );`,
        //     []
        // );
        // await client.query(`CREATE INDEX IF NOT EXISTS _idx ON  ()`, []);

        // await client.query(
        //     `CREATE TABLE IF NOT EXISTS questions(
        //         id      UUID NOT NULL UNIQUE,
        //         game_id TEXT NOT NULL,
        //     );`,
        //     []
        // );
        // await client.query(`CREATE INDEX IF NOT EXISTS _idx ON  ()`, []);

        // await client.query(``, []);
    } catch (e) {
        throw new Error('Error while initializing DB! ' + e);
    }
};

export default initDB;
