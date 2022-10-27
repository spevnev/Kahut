import next from 'next';
import { parse } from 'url';
import { createServer, IncomingMessage, ServerResponse } from 'http';
import { WebSocketServer } from 'ws';
import { useServer } from 'graphql-ws/lib/use/ws';
import createApolloHandler from './graphql/apolloServer';
import schema from './graphql/schema';

const PORT = Number(process.env.PORT) || '3000';
const IS_DEV = process.env.NODE_ENV !== 'production';

const app = next({ dev: IS_DEV });
const nextHandler = app.getRequestHandler();

app.prepare().then(async () => {
    const apolloServer = await createApolloHandler();
    const apolloHandler = apolloServer.createHandler({ path: '/api/graphql' });

    const nextServer = createServer(async (req: IncomingMessage, res: ServerResponse) => {
        try {
            const parsedUrl = parse(req.url!, true);

            if (parsedUrl.pathname === '/api/graphql') await apolloHandler(req, res);
            else await nextHandler(req, res, parsedUrl);
        } catch (e) {
            console.error(e);
            res.statusCode = 500;
            res.end();
        }
    });

    const wsServer = new WebSocketServer({ server: nextServer, path: '/api/graphql' });
    useServer({ schema }, wsServer);

    nextServer.listen(PORT);
});
