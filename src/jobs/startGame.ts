import getClient from '../db/client';
import { publish } from '../graphql/gamePubSub';

const startGame = async ({ lobbyId }: { lobbyId: string }) => {
    const client = await getClient();

    const res = await client.query(`SELECT title, image FROM games g INNER JOIN lobbies l ON g.id = l.game_id WHERE l.code = $1;`, [lobbyId]);
    const { title, image } = res.rows[0];

    // TODO: mark lobby closed

    publish(lobbyId, { event: 'START', data: { title, image } });

    // await showQuestionPub.pub({ lobbyId, question: 0 });
};

export default startGame;
