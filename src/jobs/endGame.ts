import getClient from '../db/client';
import { publish } from '../graphql/gamePubSub';

const UPDATE_AND_GET_FINAL_RESULTS = `
    WITH closed_lobby AS (
        UPDATE lobbies
        SET state = 'CLOSED'
        WHERE code = $1
        RETURNING game_id
    ), update_game AS (
        UPDATE games
        SET players = players + 1
        FROM closed_lobby
        WHERE id = game_id
    )
    SELECT username, answers, score
    FROM players
    WHERE lobby_id = $1;
`;

type EndGameData = {
    lobbyId: string;
    questionNum: number;
};

const endGame = async ({ lobbyId, questionNum }: EndGameData) => {
    try {
        const client = await getClient();

        const getFinalResultsResponse = await client.query(UPDATE_AND_GET_FINAL_RESULTS, [lobbyId]);
        const results = getFinalResultsResponse.rows;

        publish(lobbyId, { event: 'END_GAME', data: { results, questions: questionNum } });
    } catch (error) {
        console.error('endGame', error);
    }
};

export default endGame;
