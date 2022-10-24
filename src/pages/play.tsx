import { ChangeEvent, useContext, useEffect, useState } from 'react';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import StyledInput from '../components/Input';
import styled from 'styled-components';
import Header from '../components/Header';
import { color } from '../styles/theme';
import { AuthContext } from '../providers/GoogleAuthProvider';

const Container = styled.div`
    display: flex;
    flex-direction: column;
    width: 100vw;
    height: 100vh;
    align-items: center;
    justify-content: center;
`;

const Title = styled.h1`
    font-size: 60px;
    font-weight: 600;
    font-style: italic;
    color: ${color('white0')};
    margin-bottom: 10px;
`;

const Input = styled(StyledInput)`
    margin: 3px 0;
    width: 30vw;
    background: ${color('black3')};
    padding: 6px 16px;
    font-size: 18px;
    text-align: center;
`;

const Play: NextPage = () => {
    const { user } = useContext(AuthContext);
    const router = useRouter();
    const [code, setCode] = useState(router.query.code || '');
    const [username, setUsername] = useState(user?.username || '');

    useEffect(() => {
        if (code.length !== 6) return;

        // TODO: Check if lobby exists ? redirect to it : show error
    }, [code]);

    return (
        <Container>
            <Header />

            <Title>Kahut!</Title>
            <Input placeholder="Username" value={username} onChange={(e: ChangeEvent) => setUsername((e.target as HTMLInputElement).value)} disabled={!!user} />
            <Input placeholder="Code" value={code} onChange={(e: ChangeEvent) => setCode((e.target as HTMLInputElement).value.toUpperCase())} maxLength={6} />
        </Container>
    );
};

export default Play;
