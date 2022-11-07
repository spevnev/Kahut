export type Question = {
    id: string;
    title: string;
    image?: string;
    type: 'single' | 'multiple';
    time: number;
    index: number;
    choices: string[];
    answers: number[];
};

type GameData = {
    id: string;
    questions: Question[];
    image: string;
    title: string;
    description: string;
};

export default GameData;
