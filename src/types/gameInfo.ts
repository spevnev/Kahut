type GameInfo = {
    id: string;
    title: string;
    description: string;
    image?: string;
    questions: number;
    questionNum: number;
    createdAt: Date;
    players: number;
};

export default GameInfo;
