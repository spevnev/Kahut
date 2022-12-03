import { createServer, IncomingMessage, ServerResponse } from 'http';
import WebSocket, { ServerOptions, WebSocketServer } from 'ws';
import { parse } from 'url';
import next from 'next';
import { useServer } from 'graphql-ws/lib/use/ws';
import schema from './graphql/schema';
import { verifyJwt } from './utils/jwt';
import initDB from './db/initDB';
import { initSubscribers } from './db/jobScheduler/schedulers';
import { GRAPHQL_ENDPOINT, PORT, WS_PORT } from './utils/urls';

const IS_DEV = process.env.NODE_ENV !== 'production';

const nextApp = next({ dev: IS_DEV });
const nextHandler = nextApp.getRequestHandler();

nextApp.prepare().then(async () => {
    initSubscribers();
    initDB();

    const httpServer = createServer(async (req: IncomingMessage, res: ServerResponse) => {
        try {
            await nextHandler(req, res, parse(req.url!, true));
        } catch (e) {
            console.error(e);
            res.statusCode = 500;
            res.end();
        }
    });
    httpServer.listen(PORT);

    const wssOptions: ServerOptions = { path: GRAPHQL_ENDPOINT };
    if (IS_DEV) wssOptions.port = WS_PORT;
    else wssOptions.server = httpServer;

    const wsServer = new WebSocketServer(wssOptions);
    wsServer.on('connection', async (socket: WebSocket, req: IncomingMessage) => {
        try {
            const token = req.headers?.cookie?.split('game_token=')[1].split(';')[0];
            if (!token || !(await verifyJwt(token))) return socket.terminate();
        } catch (e) {
            return socket.terminate();
        }
    });

    useServer({ schema }, wsServer);
});
