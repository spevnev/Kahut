import getClient from './client';

const initDB = async () => {
    const client = await getClient();

    try {
        await client.query(`CREATE EXTENSION IF NOT EXISTS "uuid-ossp";`, []);

        await client.query(
            `CREATE OR REPLACE FUNCTION generate_code(n bigint) RETURNS text AS $$
            DECLARE
                alphabet TEXT := 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
                base INT := LENGTH(alphabet); 
                num BIGINT;
                output TEXT := '';
                l1 INT := (n >> 16) & 65535;
                r1 INT := n & 65535;
                l2 INT;
                r2 INT;
                i INT := 0;
            BEGIN
                WHILE i < 3 LOOP
                    l2 := r1;
                    r2 := l1 # ((((1366 * r1 + 150889) % 714025) / 714025.0) * 32767)::int;
                    l1 := l2;
                    r1 := r2;
                    i := i + 1;
                END LOOP;

                num := abs((r1 << 16) + l1);
                i := 6;

                LOOP
                    output := output || substr(alphabet, 1 + (num % base)::int, 1);
                    num := num / base; 
                    
                    i := i - 1;
                    EXIT WHEN i=0;
                END LOOP;
                RETURN output;
            END; 
            $$ LANGUAGE plpgsql IMMUTABLE STRICT;`,
            []
        );

        await client.query(
            `CREATE TABLE IF NOT EXISTS lobbies(
                id      BIGSERIAL,
                code    TEXT      NOT NULL DEFAULT(generate_code(currval(pg_get_serial_sequence('lobbies', 'id')))),
                game_id UUID      NOT NULL
            );`,
            []
        );
        await client.query(`CREATE UNIQUE INDEX IF NOT EXISTS lobbies_idx ON lobbies (code);`, []);

        await client.query(
            `CREATE TABLE IF NOT EXISTS players(
                picture  TEXT DEFAULT(null),
                username TEXT NOT NULL,
                score    INT  NOT NULL DEFAULT(0),
                code     TEXT NOT NULL
            );`,
            []
        );
        await client.query(`CREATE UNIQUE INDEX IF NOT EXISTS players_idx ON players (code, username);`, []);

        // await client.query(
        //     `CREATE TABLE IF NOT EXISTS games(
        //         uuid        UUID NOT NULL UNIQUE,
        //         title       TEXT NOT NULL,
        //         description TEXT NOT NULL,
        //         image       TEXT NOT NULL
        //     );`,
        //     []
        // );

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
