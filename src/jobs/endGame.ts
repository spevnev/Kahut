import getClient from '../db/client';
import { publish } from '../graphql/gamePubSub';

const CLOSE_LOBBY = `UPDATE lobbies SET state = 'CLOSED' WHERE code = $1;`;

const GET_FINAL_RESULTS = `SELECT username, answers, score FROM players WHERE lobby_id = $1;`;

const GET_NUMBER_OF_QUESTIONS = `
    SELECT COUNT(1) AS questions FROM questions 
    WHERE game_id = (
        SELECT game_id 
        FROM lobbies 
        WHERE code = $1
    )
`;

const endGame = async ({ lobbyId }: { lobbyId: string }) => {
    const client = await getClient();

    const getFinalResultsRes = await client.query(GET_FINAL_RESULTS, [lobbyId]);

    const getNumberOfQuestionsRes = await client.query(GET_NUMBER_OF_QUESTIONS, [lobbyId]);
    const questions = Number(getNumberOfQuestionsRes.rows[0].questions);

    publish(lobbyId, { event: 'END_GAME', data: { results: getFinalResultsRes.rows, questions } });

    await client.query(CLOSE_LOBBY, [lobbyId]);
};

export default endGame;
