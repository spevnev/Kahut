import getClient from '../db/client';

const showAnswer = async () => {
    const client = await getClient();

    // check for answers (they're in db)
    // schedule show question i + 1
};

export default showAnswer;
