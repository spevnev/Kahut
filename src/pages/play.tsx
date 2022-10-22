import React, { ChangeEvent, useEffect, useState } from 'react';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import StyledInput from '../components/Input';
import styled from 'styled-components';
import User from '../types/user';
import Header from '../components/Header';

const Container = styled.div`
    display: flex;
    flex-direction: column;
    width: 100vw;
    height: 100vh;
    align-items: center;
    justify-content: center;
`;

const Input = styled(StyledInput)`
    margin: 4px 0;
    width: 30vw;
`;

type Props = {
    user?: User;
};

const Play: NextPage<Props> = ({ user }) => {
    const router = useRouter();
    const [code, setCode] = useState(router.query.code || '');
    const [username, setUsername] = useState(user?.username || '');

    useEffect(() => {
        if (code.length !== 6) return;

        // TODO:!
    }, [code]);

    return (
        <Container>
            <Header user={user} />
            <Input placeholder="Username" value={username} onChange={(e: ChangeEvent) => setUsername((e.target as HTMLInputElement).value)} disabled={!!user} />
            <Input placeholder="Code" value={code} onChange={(e: ChangeEvent) => setCode((e.target as HTMLInputElement).value)} maxLength={6} />
        </Container>
    );
};

export default Play;
