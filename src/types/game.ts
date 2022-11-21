import Question from './question';

type Game = {
    id: string;
    questions: Question[];
    image: string;
    title: string;
    description: string;
};

export default Game;
