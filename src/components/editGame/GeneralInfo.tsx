import { FunctionComponent, useContext } from 'react';
import styled from 'styled-components';
import { FileUploadContext } from '../../providers/FileUploadProvider';
import { color } from '../../styles/theme';
import GameData from '../../types/gameData';

const Container = styled.div`
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    margin: 10px 0;

    @media (min-width: 1080px) {
        flex-wrap: nowrap;
    }
`;

const TextContainer = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
`;

const ImageContainer = styled.div`
    min-width: 640px;
    max-width: 640px;
    min-height: 360px;
    max-height: 360px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: ${color('black2')};
    border-radius: 3px;
    overflow: hidden;
    cursor: pointer;
    transition: filter 0.2s;
    margin-right: 20px;

    &:hover img {
        filter: brightness(0.9);
    }
`;

const Title = styled.input`
    border: none;
    outline: none;
    background: none;
    color: ${color('white0')};
    font-size: 18px;
    font-weight: 200;
    letter-spacing: -0.3px;
    padding: 0 5px 2px 5px;
    border-bottom: 1px solid ${color('white2')};
    margin: 10px 0;
`;

const Description = styled.textarea`
    resize: none;
    padding: 5px 12px;
    width: 100%;
    height: 25vh;
    font-size: 14px;
    font-weight: 300;
    color: ${color('white0')};
    background: ${color('black0')};
    border-radius: 8px;
    border: none;
    outline: none;

    &::-webkit-scrollbar {
        display: none;
    }
`;

type Props = {
    game: GameData;
    setGame: (game: GameData) => void;
};

const GeneralInfo: FunctionComponent<Props> = ({ game, setGame }) => {
    const { upload } = useContext(FileUploadContext);
    const uploadImage = () => upload(image => setGame({ ...game, image }));

    return (
        <Container>
            <ImageContainer onClick={uploadImage}>
                <img style={{ height: '100%' }} src={game.image} alt="Game's image" />
            </ImageContainer>

            <TextContainer>
                <Title value={game.title} onChange={e => setGame({ ...game, title: e.target.value })} maxLength={60} />
                <Description value={game.description} onChange={e => setGame({ ...game, description: e.target.value })} maxLength={1000} />
            </TextContainer>
        </Container>
    );
};

export default GeneralInfo;
