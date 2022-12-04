import { ResolverContext } from '../../pages/api/graphql';
import { createJwt } from '../../utils/jwt';
import { publish } from '../gamePubSub';

export const GAME_TOKEN_DURATION = 60 * 45;

export const JOIN_LOBBY = `
    WITH lobby_state AS (
        SELECT state FROM lobbies WHERE code = $2
    ), players_count AS (
        SELECT COUNT(1) AS players_count
        FROM players
        WHERE lobby_id = $2 AND username = $1
    ), insert_player AS (
        INSERT INTO players(username, lobby_id)
        SELECT $1, $2
        FROM lobby_state, players_count
        WHERE state = 'OPEN' AND players_count = 0
    ) SELECT * FROM lobby_state, players_count;
`;

type JoinLobbyArgs = {
    username: string;
    code: string;
};

type JoinLobbyResponse = {
    token: string | null;
    error: string | null;
};

const joinLobby = async (_parent: void, { username, code }: JoinLobbyArgs, { db }: ResolverContext): Promise<JoinLobbyResponse> => {
    if (code.length !== 6 || username.length < 1 || username.length > 256) return { token: null, error: 'There is no game with this code!' };

    const { rows } = await db.query(JOIN_LOBBY, [username, code]);

    if (!rows[0] || rows[0].state !== 'OPEN') return { token: null, error: 'There is no game with this code!' };
    if (rows[0].players_count !== '0') return { token: null, error: 'Duplicate username!' };

    publish(code, { event: 'PLAYER_JOINING', data: { player: username } });

    return { token: await createJwt({ username, code, isHost: false }, GAME_TOKEN_DURATION), error: null };
};

export default joinLobby;
