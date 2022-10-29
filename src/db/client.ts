import { Pool } from 'pg';

export type DBClient = Pool;

let client: DBClient;
const getClient = async () => {
    if (!client) {
        client = new Pool({ connectionString: process.env.DB_CONNECTION_STRING, max: 5 });
        await client.connect();
    }

    return client;
};

export default getClient;
