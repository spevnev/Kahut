import { NextPage } from 'next';
import styled from 'styled-components';
import Header from '../components/Header';
import { ButtonColor } from '../components/QuizButton';
import CommentReview from '../components/landing/CommentReview';
import PopularityCounter from '../components/landing/PopularityCounter';
import InfoCard from '../components/landing/InfoCard';
import TextItem from '../components/landing/TextItem';
import FakeQuizButton from '../components/FakeQuizButton';
import personImage1 from '../../public/images/person.jpeg';
import personImage2 from '../../public/images/person2.jpeg';
import hammerIcon from '../../public/icons/hammer.svg';
import bullhornIcon from '../../public/icons/bullhorn.svg';
import gamepadIcon from '../../public/icons/gamepad.svg';
import { color } from '../styles/theme';

const Page = styled.div`
    display: flex;
    flex-direction: column;
    margin: 0 auto;
    align-items: center;
    width: 100vw;
`;

const Row = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    padding: 20px 0;
`;

const Buttons = styled(Row)`
    @media (max-width: 1000px) {
        justify-content: space-between;
        flex-wrap: wrap;

        button {
            width: 40vw;
            min-width: 200px;
        }
    }

    @media (max-width: 450px) {
        flex-direction: column;
        align-items: center;

        button {
            width: 90%;
        }
    }
`;

const Comments = styled(Row)`
    @media (max-width: 600px) {
        flex-direction: column;
        align-items: center;

        & > div {
            margin: 10px 0;
            width: 100%;
        }
    }
`;

const Column = styled.div`
    display: flex;
    flex-direction: column;
`;

const SubTitle = styled.h2`
    font-size: 60px;
    font-weight: 100;
    text-align: center;

    @media (max-width: 800px) {
        font-size: 48px;
    }

    @media (max-width: 450px) {
        font-size: 36px;
    }
`;

const MainText = styled.h1`
    font-size: 54px;
    font-weight: 100;
    color: ${color('white0')};

    @media (max-width: 800px) {
        font-size: 40px;
    }

    @media (max-width: 450px) {
        font-size: 32px;
    }
`;

const SecondaryText = styled.h4`
    font-size: 18px;
    font-weight: 200;
    color: ${color('white2')};
`;

const TiltedContainer = styled(Column)`
    background: ${color('black0')};
    width: 100vw;
    min-height: 60vh;
    height: fit-content;
    padding: 7.5vh 2.5vw;
    clip-path: polygon(0 8vh, 100% 0, 100% calc(100% - 8vh), 0 100%);
`;

const LandingContainer = styled(Row)`
    width: 90vw;
    height: 60vh;
    align-items: center;

    @media (max-width: 800px) {
        flex-direction: column;
        height: fit-content;
    }
`;

const TextContainer = styled(Column)`
    width: 60vw;

    @media (max-width: 800px) {
        width: 80vw;
        margin-bottom: 20px;
    }
`;

const TextItems = styled(Row)`
    width: 80vw;
    margin: auto;

    @media (max-width: 450px) {
        flex-direction: column;
        align-items: center;
    }
`;

const Landing: NextPage = () => (
    <Page>
        <Header />
        <LandingContainer>
            <TextContainer>
                <MainText>Worst learning platform,</MainText>
                <MainText>that people hate.</MainText>
                <SecondaryText>Improve learning by using this fun, innovative, and accessible testing service.</SecondaryText>
            </TextContainer>
            <InfoCard />
        </LandingContainer>
        <TiltedContainer>
            <SubTitle>Simple.</SubTitle>
            <TextItems>
                <TextItem title="Create" icon={hammerIcon}>
                    It only takes a few minutes to create a learning game on any topic.
                </TextItem>
                <TextItem title="Share" icon={bullhornIcon}>
                    Share a game with remote 1s to play together.
                </TextItem>
                <TextItem title="Play" icon={gamepadIcon}>
                    Game on! Join a Kahut game with a code provided by the host and answer questions.
                </TextItem>
            </TextItems>
        </TiltedContainer>
        <Column style={{ width: '95vw' }}>
            <PopularityCounter />
            <Buttons>
                <FakeQuizButton color={ButtonColor.RED}>Less than 0% of teachers use Kahut</FakeQuizButton>
                <FakeQuizButton color={ButtonColor.BLUE}>Players from more than 0 countries</FakeQuizButton>
                <FakeQuizButton color={ButtonColor.YELLOW}>Over 1 exciting games available</FakeQuizButton>
                <FakeQuizButton color={ButtonColor.GREEN}>Largest learning platform in the room</FakeQuizButton>
            </Buttons>
            <Comments>
                <CommentReview user={{ name: 'A random dude', image: personImage1 }}>Kahut is a fantastic way to engage every single student - even remotely.</CommentReview>
                <CommentReview user={{ name: 'Just a stranger', image: personImage2 }}>
                    Kahut has become one of our "flagship training tools". I believe Kahut is irreplaceable, as it involves learners throughout sessions and also helps employees
                    retain important information more effectively.
                </CommentReview>
            </Comments>
        </Column>
    </Page>
);

export default Landing;
