import Redis from 'ioredis';
import { createPubSub, PubSub } from 'graphql-yoga';
import { createRedisEventTarget } from '@graphql-yoga/redis-event-target';

type GameEventData = {
    event: string;
    data: { [key: string]: any };
};

let pubsub: PubSub<any>;
const getPubSub = () => {
    if (!pubsub) {
        const connectionString = process.env.REDIS_CONNECTION_STRING;
        if (!connectionString) throw new Error('No REDIS_CONNECTION_STRING!');

        const publishClient = new Redis(connectionString);
        const subscribeClient = new Redis(connectionString);

        const eventTarget = createRedisEventTarget({
            publishClient,
            subscribeClient,
        });

        pubsub = createPubSub({ eventTarget });
    }

    return pubsub;
};

export const publish = (lobbyId: string, { event, data }: GameEventData) => getPubSub().publish(`GAME_EVENT_${lobbyId}`, { onGameEvent: { event, data: JSON.stringify(data) } });

export default getPubSub;
