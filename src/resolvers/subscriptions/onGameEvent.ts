import jwt from 'jsonwebtoken';
import getPubSub from '../../graphql/gamePubSub';
import GameTokenData from '../../types/gameTokenData';

const onGameEvent = {
    subscribe: async (_parent: void, { game_token }: { game_token: string }) => {
        const { code } = jwt.decode(game_token) as GameTokenData;
        return getPubSub().subscribe(`GAME_EVENT_${code}`);
    },
};

export default onGameEvent;
