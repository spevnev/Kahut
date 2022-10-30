type QuestionType = 'single' | 'multiple';

export type Question = {
    id: string;
    title: string;
    image?: string;
    type: QuestionType;
    time: number;
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
