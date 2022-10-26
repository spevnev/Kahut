import { FunctionComponent } from 'react';
import styled from 'styled-components';
import { color } from '../../styles/theme';
import GameData from '../../types/gameData';
import ChangeableImage from '../ChangeableImage';
import InlineInput from '../InlineInput';

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
    overflow: hidden;
    margin-right: 20px;
`;

const Title = styled(InlineInput)`
    letter-spacing: -0.3px;
    margin: 10px 0;
`;

const Description = styled.textarea`
    resize: none;
    padding: 5px 12px;
    width: 100%;
    font-size: 14px;
    font-weight: 300;
    height: 20vh;
    color: ${color('white0')};
    background: ${color('black3')};
    border-radius: 8px;
    border: none;
    outline: none;

    &::-webkit-scrollbar {
        display: none;
    }

    @media (min-width: 1080px) {
        height: 100%;
    }
`;

type Props = {
    game: GameData;
    setGame: (game: GameData) => void;
};

const GeneralInfo: FunctionComponent<Props> = ({ game, setGame }) => (
    <Container>
        <ImageContainer>
            <ChangeableImage src={game.image} onChange={image => setGame({ ...game, image })} />
        </ImageContainer>
        <TextContainer>
            <Title value={game.title} onChange={e => setGame({ ...game, title: e.target.value })} maxLength={60} />
            <Description value={game.description} onChange={e => setGame({ ...game, description: e.target.value })} maxLength={1000} />
        </TextContainer>
    </Container>
);

export default GeneralInfo;
