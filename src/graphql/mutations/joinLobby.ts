import { createJwt } from '../../utils/jwt';
import { ResolverContext } from '../apolloServer';
import { publish } from '../gamePubSub';

export const GAME_TOKEN_DURATION = 60 * 45; // 45m

export const JOIN_LOBBY = `
    INSERT INTO players(username, picture, lobby_id) 
    SELECT $1, $2, $3
    WHERE exists(SELECT state FROM lobbies WHERE code = $3 AND state = 'OPEN')
    ON CONFLICT DO NOTHING;
`;

type JoinLobbyArgs = {
    username: string;
    picture: string | null;
    code: string;
};

const joinLobby = async (_parent: void, { username, code, picture }: JoinLobbyArgs, { db }: ResolverContext): Promise<string | null> => {
    if (code.length !== 6 || username.length < 1 || username.length > 256) return null;

    const res = await db.query(JOIN_LOBBY, [username, picture, code]);
    if (res.rowCount === 0) return null;

    publish(code, { event: 'PLAYER_JOINING', data: { player: { username, picture } } });

    return createJwt({ username, picture, code, isHost: false }, GAME_TOKEN_DURATION);
};

export default joinLobby;
