import type {NextPage} from "next";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100vw;
  height: 100vh;
`;

const Title = styled.h1`
  font-size: 24px;
  color: #08085e;
`;


const Home: NextPage = () => {
	return (
		<Container>
			<Title>
				Hello world
			</Title>
		</Container>
	);
};

export default Home;
