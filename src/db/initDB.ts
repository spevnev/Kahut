import getClient from './client';

const initDB = async () => {
    const client = await getClient();

    try {
        await client.query(`CREATE EXTENSION IF NOT EXISTS "uuid-ossp";`, []);

        await client.query(
            `CREATE OR REPLACE FUNCTION generate_code(n BIGINT) RETURNS TEXT AS $$
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
                    r2 := l1 # ((((1366 * r1 + 150889) % 714025) / 714025.0) * 32767)::INT;
                    l1 := l2;
                    r1 := r2;
                    i := i + 1;
                END LOOP;

                num := ABS((r1 << 16) + l1);
                i := 6;

                LOOP
                    output := output || SUBSTR(alphabet, 1 + (num % base)::INT, 1);
                    num := num / base; 
                    
                    i := i - 1;
                    EXIT WHEN i = 0;
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
                game_id UUID      NOT NULL,
                state   TEXT      NOT NULL DEFAULT('OPEN')
            );`,
            []
        );
        await client.query(`CREATE UNIQUE INDEX IF NOT EXISTS lobbies_idx ON lobbies (code);`, []);

        await client.query(
            `CREATE TABLE IF NOT EXISTS players(
                username TEXT NOT NULL,
                score    INT  NOT NULL DEFAULT(0),
                answers  INT  NOT NULL DEFAULT(0), 
                lobby_id TEXT NOT NULL
            );`,
            []
        );
        await client.query(`CREATE UNIQUE INDEX IF NOT EXISTS players_idx ON players (lobby_id, username);`, []);

        await client.query(
            `CREATE TABLE IF NOT EXISTS games(
                id           UUID        NOT NULL,
                title        TEXT        NOT NULL,
                description  TEXT        NOT NULL,
                image        TEXT,
                creator      TEXT        NOT NULL,
                question_num INT         NOT NULL DEFAULT(0),
                players      INT         NOT NULL DEFAULT(0),
                created_at   TIMESTAMPTZ NOT NULL DEFAULT(NOW())
            );`,
            []
        );
        await client.query(`CREATE UNIQUE INDEX IF NOT EXISTS games_idx ON games (id);`, []);

        await client.query(
            `CREATE TABLE IF NOT EXISTS questions(
                id       UUID   NOT NULL,
                game_id  UUID   NOT NULL,
                index    INT    NOT NULL,
                title    TEXT   NOT NULL,
                image    TEXT,
                type     TEXT   NOT NULL,
                time     INT    NOT NULL,
                choices  TEXT[] NOT NULL,
                answers  INT[]  NOT NULL
            );`,
            []
        );
        await client.query(`CREATE UNIQUE INDEX IF NOT EXISTS questions_idx ON questions (id);`, []);
        await client.query(`CREATE INDEX IF NOT EXISTS questions_index_idx ON questions (index);`, []); // TODO: check if it is useful

        await client.query(
            `CREATE TABLE IF NOT EXISTS answers(
                username    TEXT        NOT NULL,
                lobby_id    TEXT        NOT NULL,
                question_id TEXT        NOT NULL,
                answered_at TIMESTAMPTZ NOT NULL DEFAULT(NOW()),
                answers     INT[]       NOT NULL
            );`,
            []
        );
        await client.query(`CREATE UNIQUE INDEX IF NOT EXISTS answers_idx ON answers (lobby_id, question_id, username);`, []);
    } catch (e) {
        throw new Error('Error while initializing DB! ' + e);
    }
};

export default initDB;
