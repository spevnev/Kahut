import { NextApiHandler } from 'next';
import apollo, { connectionPromises } from '../../graphql/apollo-server';

export const config = { api: { bodyParser: false } };

let apolloHandler: NextApiHandler;
const handler: NextApiHandler = async (req, res) => {
    if (req.method === 'OPTIONS') return res.end();

    if (!apolloHandler) {
        await Promise.all(connectionPromises);
        apolloHandler = apollo.createHandler({ path: '/api/graphql' });
    }

    await apolloHandler(req, res);
};

export default handler;
