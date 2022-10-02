import type {NextPage} from "next";
import styled from "styled-components";
import Header from "../components/Header";
import {ButtonColor} from "../components/QuizButton";
import CommentReview from "../components/landing/CommentReview";
import PopularityCounter from "../components/landing/PopularityCounter";
import InfoCard from "../components/landing/InfoCard";
import TextItem from "../components/landing/TextItem";
import personImage1 from "../../public/images/person.jpeg";
import personImage2 from "../../public/images/person2.jpeg";
import hammerIcon from "../../public/icons/hammer.svg";
import bullhornIcon from "../../public/icons/bullhorn.svg";
import gamepadIcon from "../../public/icons/gamepad.svg";
import FakeQuizButton from "../components/landing/FakeQuizButton";


const Page = styled.div`
	width: 95vw;
	height: 100%;
	display: flex;
	flex-direction: column;
	margin: 0 auto;
`;

const Row = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: space-between;
`;

const Column = styled.div`
	display: flex;
	flex-direction: column;
`;

const SubTitle = styled.h2`
	font-size: 60px;
	font-weight: 200;
`;

const MainText = styled.h1`

`;

const SecondaryText = styled.h4`

`;


const Landing: NextPage = () => (
	<Page>
		<Header/>
		<Row>
			<Column>
				<MainText>

				</MainText>
				<SecondaryText>

				</SecondaryText>
			</Column>
			<InfoCard/>
		</Row>
		<Column>
			<SubTitle></SubTitle>
			<Row>
				<TextItem title="" icon={hammerIcon}>
					description 1
				</TextItem>
				<TextItem title="" icon={bullhornIcon}>
					description 2
				</TextItem>
				<TextItem title="" icon={gamepadIcon}>
					description 3
				</TextItem>
			</Row>
		</Column>
		<Column>
			<PopularityCounter/>
			<Row>
				<FakeQuizButton color={ButtonColor.RED}>Less than 0% of teachers use Kahut</FakeQuizButton>
				<FakeQuizButton color={ButtonColor.BLUE}>Players from more than 0 countries</FakeQuizButton>
				<FakeQuizButton color={ButtonColor.YELLOW}>Over 1 exciting games available</FakeQuizButton>
				<FakeQuizButton color={ButtonColor.GREEN}>Largest learning platform in the room</FakeQuizButton>
			</Row>
			<Row>
				<CommentReview user={{name: "Example 1", image: personImage1}}>
					Kahut is a fantastic way to engage every single student - even remotely.
				</CommentReview>
				<CommentReview user={{name: "Example 2", image: personImage2}}>
					Kahut has become one of our "flagship training tools". I believe Kahut is irreplaceable, as it involves learners throughout sessions and also helps
					employees retain important information more effectively.
				</CommentReview>
			</Row>
		</Column>
	</Page>
);

export const getStaticProps = async () => ({props: {}});

export default Landing;