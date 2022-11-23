type GameInfo = {
    id: string;
    title: string;
    description: string;
    image?: string;
    questions: number;
    players: number;
    rating: number;
    creator: string;
};

export default GameInfo;
