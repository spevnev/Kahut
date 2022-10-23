import { ChangeEvent, useEffect, useState } from 'react';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import StyledInput from '../components/Input';
import styled from 'styled-components';
import Header from '../components/Header';
import { AuthProps } from '../components/GoogleAuthProvider';

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

const Play: NextPage<AuthProps> = ({ user, auth }) => {
    const router = useRouter();
    const [code, setCode] = useState(router.query.code || '');
    const [username, setUsername] = useState(user?.username || '');

    useEffect(() => {
        if (code.length !== 6) return;

        // TODO: Check if lobby exists ? redirect to it : show error
    }, [code]);

    return (
        <Container>
            <Header auth={auth} />
            <Input placeholder="Username" value={username} onChange={(e: ChangeEvent) => setUsername((e.target as HTMLInputElement).value)} disabled={!!user} />
            <Input placeholder="Code" value={code} onChange={(e: ChangeEvent) => setCode((e.target as HTMLInputElement).value.toUpperCase())} maxLength={6} />
        </Container>
    );
};

export default Play;
