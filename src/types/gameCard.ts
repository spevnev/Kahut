type GameCard = {
    image: string;
    title: string;
    description: string;
    id: string;
    questions: number;
    players: number;
    rating: number;
    user: {
        username: string;
        avatar: string;
    };
};

export default GameCard;
