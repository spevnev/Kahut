import { Client } from 'pg';
import initDB from './initDB';

export type DBClient = Client;

let client: DBClient | undefined;
const initClient = async () => {
    if (client) return client;
    client = new Client({ connectionString: process.env.DB_CONNECTION_STRING });

    await client.connect();
    await initDB(client);

    return client;
};

export default initClient;
