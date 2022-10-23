import { NextPage } from 'next';
import styled from 'styled-components';
import { AuthProps } from '../../components/GoogleAuthProvider';
import Header from '../../components/Header';

const Container = styled.div``;

const EditGame: NextPage<AuthProps> = ({ auth }) => {
    return (
        <Container>
            <Header auth={auth} />
        </Container>
    );
};

export default EditGame;
