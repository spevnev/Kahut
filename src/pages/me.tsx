import React, { useContext } from 'react';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import styled from 'styled-components';
import { color } from '../styles/theme';
import Header from '../components/Header';
import StyledInput from '../components/BoxInput';
import { AuthContext } from '../providers/GoogleAuthProvider';
import { voidFunction } from '../utils/helper';

const Container = styled.div`
    display: flex;
    flex-direction: column;
    width: 100vw;
    height: 100vh;
    padding: 10px;
`;

const UserData = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    height: fit-content;
    margin: 20px 0;
`;

const Inputs = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const Label = styled.p`
    font-size: 14px;
    font-weight: 300;
    color: ${color('white1')};
    width: 100%;
`;

const Icon = styled.img`
    width: 96px;
    height: 96px;
    border-radius: 50%;
    margin-right: 15px;
`;

const Input = styled(StyledInput)`
    width: 30vw;
`;

const Profile: NextPage = () => {
    const router = useRouter();
    const { user } = useContext(AuthContext);

    if (!user) {
        router.push('/');
        return null;
    }

    const { name, email, picture } = user;
    return (
        <Container>
            <Header />

            <UserData>
                <Icon src={picture} />
                <Inputs>
                    <Label>Username</Label>
                    <Input disabled={true} value={name} onChange={voidFunction} />
                    <Label>Email</Label>
                    <Input disabled={true} value={email} onChange={voidFunction} />
                </Inputs>
            </UserData>
        </Container>
    );
};

export default Profile;
