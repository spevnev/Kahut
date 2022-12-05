import { PubSub } from 'graphql-subscriptions';

type GameEventData = {
    event: string;
    data: { [key: string]: any };
};

const pubsub = new PubSub();
export const publish = (lobbyId: string, { event, data }: GameEventData) => pubsub.publish(`GAME_EVENT_${lobbyId}`, { onGameEvent: { event, data: JSON.stringify(data) } });

export default pubsub;
