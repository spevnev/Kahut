import { NextPage } from 'next';
import styled from 'styled-components';
import Header from '../../components/Header';
import User from '../../types/user';

const Container = styled.div``;

type Props = {
    user?: User;
};

const EditGame: NextPage<Props> = ({ user }) => {
    return (
        <Container>
            <Header user={user} />
        </Container>
    );
};

export default EditGame;
