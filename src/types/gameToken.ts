type GameToken = {
    name: string;
    picture: string | null;
    code: string;
    isHost: boolean;
    exp: number;
};

export default GameToken;
