import { PubSub } from 'graphql-subscriptions';

const pubsub = new PubSub();

type GameEventData = {
    event: string;
    data: { [key: string]: any };
};
export const publish = (lobbyId: string, { event, data }: GameEventData) => {
    pubsub.publish(`GAME_EVENT_${lobbyId}`, { onGameEvent: { event, data: JSON.stringify(data) } });
};

export default pubsub;
