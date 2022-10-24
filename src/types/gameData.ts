export type Question = {
    id: string;
    title: string;
    image?: string;
    type: string;
    time: number;
    answers: string[];
    correctAnswer: number[];
};

type GameData = {
    id: string;
    questions: Question[];
    image: string;
    title: string;
    description: string;
};

export default GameData;
