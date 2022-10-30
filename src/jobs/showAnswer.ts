import getClient from '../db/client';

const showAnswer = async ({ lobbyId, answers, idx }: { lobbyId: string; answers: number[]; idx: number }) => {
    const client = await getClient();
};

export default showAnswer;
