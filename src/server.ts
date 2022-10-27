import next from 'next';
import { parse } from 'url';
import { createServer, IncomingMessage, ServerResponse } from 'http';
import { WebSocketServer } from 'ws';
import { useServer } from 'graphql-ws/lib/use/ws';
import createApolloHandler from './graphql/apolloServer';
import schema from './graphql/schema';

const PORT = Number(process.env.PORT) || '3000';
const IS_DEV = process.env.NODE_ENV !== 'production';
const GRAPHQL_ENDPOINT = '/api/graphql';

const nextApp = next({ dev: IS_DEV });
const nextHandler = nextApp.getRequestHandler();

nextApp.prepare().then(async () => {
    const apolloApp = await createApolloHandler();
    const apolloHandler = apolloApp.createHandler({ path: GRAPHQL_ENDPOINT });

    const wsServer = new WebSocketServer({ noServer: true, path: GRAPHQL_ENDPOINT });
    useServer({ schema }, wsServer);

    const httpServer = createServer(async (req: IncomingMessage, res: ServerResponse) => {
        try {
            const parsedUrl = parse(req.url!, true);

            if (parsedUrl.pathname === GRAPHQL_ENDPOINT) await apolloHandler(req, res);
            else await nextHandler(req, res, parsedUrl);
        } catch (e) {
            console.error(e);
            res.statusCode = 500;
            res.end();
        }
    });

    httpServer.listen(PORT);

    httpServer.on('upgrade', (request, socket, head) => {
        if (request.url === GRAPHQL_ENDPOINT) {
            wsServer.handleUpgrade(request, socket, head, socket => wsServer.emit('connection', socket, request));
        }
    });
});
