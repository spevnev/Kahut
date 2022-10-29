import { Pool } from 'pg';
import initDB from './initDB';

export type DBClient = Pool;

let client: DBClient | undefined;
const initClient = async () => {
    if (client) return client;
    client = new Pool({ connectionString: process.env.DB_CONNECTION_STRING, max: 5 });

    await client.connect();
    await initDB(client);

    return client;
};

export default initClient;
