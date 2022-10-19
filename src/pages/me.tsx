import React from 'react';
import { NextPage } from 'next';
import styled from 'styled-components';
import goBackIcon from '../../public/icons/goBack.svg';
import { useRouter } from 'next/router';
import { isAuthenticated } from '../utils/authentication';
import { color } from '../utils/globalStyles';
import { isBrowser } from '../utils/helper';
import useTokenData from '../hooks/useTokenData';

const Column = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const Container = styled.div`
    display: flex;
    flex-direction: row;
    width: 100vw;
    height: 100vh;
    padding: 10px;
`;

const GoBack = styled.img`
    width: 32px;
    height: 32px;
    cursor: pointer;
`;

const Label = styled.p`
    font-size: 14px;
    font-weight: 300;
    color: ${color('white1')};
`;

const Icon = styled.img`
    width: 96px;
    height: 96px;
    border-radius: 50%;
`;

const Input = styled.input``;

const Profile: NextPage = () => {
    const router = useRouter();
    const { avatar, username, email } = useTokenData();

    if (!isAuthenticated() && isBrowser()) router.push('/');

    return (
        <Container>
            <GoBack src={goBackIcon.src} onClick={() => router.back()} />

            <Icon src={avatar} />

            <Column>
                <Label>Username</Label>
                <Input placeholder="Username" value={username} onChange={() => {}} />
                <Label>Email</Label>
                <Input disabled={true} value={email} onChange={() => {}} />
            </Column>
        </Container>
    );
};

export default Profile;
