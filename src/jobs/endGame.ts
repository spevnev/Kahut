import getClient from '../db/client';
import { publish } from '../graphql/gamePubSub';

const CLOSE_LOBBY = `UPDATE lobbies SET state = 'CLOSED' WHERE code = $1;`;

const GET_FINAL_RESULTS = `SELECT username, answers, score FROM players WHERE lobby_id = $1;`;

const endGame = async ({ lobbyId, questionsNum }: { lobbyId: string; questionsNum: number }) => {
    const client = await getClient();

    const getFinalResultsRes = await client.query(GET_FINAL_RESULTS, [lobbyId]);
    publish(lobbyId, { event: 'END_GAME', data: { results: getFinalResultsRes.rows, questions: questionsNum } });

    await client.query(CLOSE_LOBBY, [lobbyId]);
};

export default endGame;
