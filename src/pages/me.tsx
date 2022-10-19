import React from 'react';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import styled from 'styled-components';
import goBackIcon from '../../public/icons/goBack.svg';
import { color } from '../utils/globalStyles';
import User from '../utils/user';
import { isBrowser } from '../utils/helper';

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

type Props = {
    user: User;
};

const Profile: NextPage<Props> = ({ user }) => {
    const router = useRouter();

    if (isBrowser() && !user) router.push('/');

    return (
        <Container>
            <GoBack src={goBackIcon.src} onClick={() => router.back()} />

            <Icon src={user.avatar} />

            <Column>
                <Label>Username</Label>
                <Input placeholder="Username" value={user.username} onChange={() => {}} />
                <Label>Email</Label>
                <Input disabled={true} value={user.email} onChange={() => {}} />
            </Column>
        </Container>
    );
};

export const getServerSideProps = async (...args: any[]) => {
    console.log(args);
    return { props: {} };
};

export default Profile;