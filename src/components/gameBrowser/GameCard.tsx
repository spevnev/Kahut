import { forwardRef, FunctionComponent } from 'react';
import { useRouter } from 'next/router';
import styled from 'styled-components';
import GameCardProps from '../../types/gameInfo';
import { color } from '../../styles/theme';
import { limitStringTo, numberFormatter } from '../../utils/helper';
import imagePlaceholder from '../../../public/images/image-placeholder.png';

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    min-width: 200px;
    width: 15vw;
    max-width: 300px;
    min-height: 275px;
    background: ${color('black0')};
    border-radius: 5px;
    overflow: hidden;
    cursor: pointer;
    transition: filter 0.2s;

    &:hover {
        filter: brightness(0.9);
    }
`;

const ImageContainer = styled.div`
    width: 100%;
    min-height: 150px;
    max-height: 150px;
    display: flex;
    justify-content: center;
    background: ${color('black2')};
`;

const TextContainer = styled.div`
    padding: 4px 10px;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
`;

const Title = styled.p`
    font-size: 13px;
    font-weight: 200;
    color: ${color('white0')};
    letter-spacing: -0.2px;
    margin: 2px 0;
`;

const Description = styled.p`
    font-size: 11px;
    font-weight: 200;
    color: ${color('white1')};
    letter-spacing: -0.1px;
`;

const SecondaryText = styled.p`
    font-size: 9.5px;
    font-weight: 300;
    color: ${color('white2')};
`;

const Row = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    margin: 2px 0;
`;

const GameCard: FunctionComponent<GameCardProps> = ({ image, title, description, id, questions, players }, ref) => {
    const router = useRouter();

    return (
        <Container onClick={() => router.push(`/games/${id}`)} ref={ref}>
            <ImageContainer>
                <img style={{ height: '100%' }} src={image || imagePlaceholder.src} alt="Game card's image" />
            </ImageContainer>

            <TextContainer>
                <div>
                    <Row>
                        <SecondaryText>
                            {questions} questions • {numberFormatter.format(players)} players
                        </SecondaryText>
                    </Row>

                    <Title>{limitStringTo(title, 60)}</Title>
                    <Description>{limitStringTo(description, 150)}</Description>
                </div>
            </TextContainer>
        </Container>
    );
};

export default forwardRef(GameCard as any);
