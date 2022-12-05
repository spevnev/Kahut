import { createServer, IncomingMessage, ServerResponse } from 'http';
import WebSocket, { ServerOptions, WebSocketServer } from 'ws';
import { parse } from 'url';
import next from 'next';
import { useServer } from 'graphql-ws/lib/use/ws';
import schema from './graphql/schema';
import { verifyJwt } from './utils/jwt';
import initDB from './db/initDB';
import { initSubscribers } from './db/jobScheduler/schedulers';
import { GRAPHQL_ENDPOINT, PORT, WEBSOCKET_PORT } from './utils/urls';

const IS_DEV = process.env.NODE_ENV !== 'production';

const nextApp = next({ dev: IS_DEV });
const nextHandler = nextApp.getRequestHandler();

const startServer = async () => {
    await nextApp.prepare();

    initSubscribers();
    initDB();

    const httpServer = createServer(async (request: IncomingMessage, response: ServerResponse) => {
        try {
            if (request.url) {
                const parsedUrl = parse(request.url, true);
                await nextHandler(request, response, parsedUrl);
            }
        } catch (error) {
            console.error(error);
            response.statusCode = 500;
            response.end();
        }
    });
    httpServer.listen(PORT);

    const wssOptions: ServerOptions = { path: GRAPHQL_ENDPOINT };
    if (IS_DEV) wssOptions.port = WEBSOCKET_PORT;
    else wssOptions.server = httpServer;

    const wsServer = new WebSocketServer(wssOptions);
    wsServer.on('connection', async (socket: WebSocket, request: IncomingMessage) => {
        try {
            const token = request.headers?.cookie?.split('game_token=')[1].split(';')[0];
            if (!token || !(await verifyJwt(token))) return socket.terminate();
        } catch {
            return socket.terminate();
        }
    });

    useServer({ schema }, wsServer); // eslint-disable-line react-hooks/rules-of-hooks
};

startServer();
