type Question = {
    id: string;
    title: string;
    image?: string;
    type: 'single' | 'multiple';
    time: number;
    index: number;
    choices: string[];
    answers: number[];
};

export default Question;
