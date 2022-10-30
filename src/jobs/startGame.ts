import getClient from '../db/client';
import { getPublishers } from '../db/jobScheduler/schedulers';
import { publish } from '../graphql/gamePubSub';

const startGame = async ({ lobbyId }: { lobbyId: string }) => {
    const client = await getClient();

    const res = await client.query(`SELECT g.* FROM games g INNER JOIN lobbies l ON g.id = l.game_id WHERE l.code = $1;`, [lobbyId]);
    const { id, title, image } = res.rows[0];

    // TODO: mark lobby closed + check if already closed = don't start + error

    publish(lobbyId, { event: 'START', data: { title, image } });

    await getPublishers().showQuestionPub.pub({ lobbyId, gameId: id, idx: 0 }, new Date(Date.now() + 5 * 1000));
};

export default startGame;
