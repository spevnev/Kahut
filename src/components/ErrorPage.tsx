import React, { FunctionComponent } from 'react';
import styled from 'styled-components';
import { useRouter } from 'next/router';
import { color } from '../utils/globalStyles';

const Container = styled.div`
    margin: 0 auto;
    width: 65vw;
    height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;

const Title = styled.h1`
    font-size: 60px;
    font-weight: 100;
    color: ${color('white0')};
    text-align: center;
`;

const SubTitle = styled.h3`
    font-size: 24px;
    font-weight: 200;
    color: ${color('white1')};
    text-align: center;
`;

const GoBack = styled.h3`
    font-size: 24px;
    font-weight: 100;
    color: ${color('frost1')};
`;

type Props = {
    title: string;
    subtitle: string;
};

const ErrorPage: FunctionComponent<Props> = ({ title, subtitle }) => {
    const router = useRouter();

    return (
        <Container>
            <Title>{title}</Title>
            <SubTitle>{subtitle}</SubTitle>
            <GoBack onClick={() => router.back()}>Go back</GoBack>
        </Container>
    );
};

export default ErrorPage;
