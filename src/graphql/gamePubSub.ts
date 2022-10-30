import { PubSub } from 'graphql-subscriptions';

const pubsub = new PubSub();

export const publish = (lobbyId: string, payload: any) => pubsub.publish(`GAME_EVENT_${lobbyId}`, { onGameEvent: JSON.stringify(payload) });
export default pubsub;
