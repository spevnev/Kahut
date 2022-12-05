const IS_DEV = process.env.NODE_ENV !== 'production';

export const PORT = Number(process.env.PORT) || 3000;
export const WEBSOCKET_PORT = IS_DEV ? PORT + 1 : PORT;

export const GRAPHQL_ENDPOINT = '/api/graphql';

export const API_URL = (IS_DEV ? `http://localhost:${PORT}` : process.env.URL) + GRAPHQL_ENDPOINT;
export const WEBSOCKET_URL = IS_DEV ? `ws://localhost:${WEBSOCKET_PORT}${GRAPHQL_ENDPOINT}` : API_URL.replace('https', 'ws').replace('http', 'ws');
