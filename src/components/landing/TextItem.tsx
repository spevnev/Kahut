import React, { FunctionComponent } from 'react';
import styled from 'styled-components';
import { StaticImageData } from 'next/image';

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 26vw;
    margin: 10px;

    @media (max-width: 450px) {
        width: 60vw;
    }
`;

const Icon = styled.img`
    width: 60px;
    height: 60px;

    @media (max-width: 800px) {
        width: 48px;
        height: 48px;
    }
`;

const Title = styled.h2`
    font-size: 28px;
    font-weight: 200;
    text-align: center;
    margin: 8px 0;

    @media (max-width: 800px) {
        font-size: 24px;
    }
`;

const Description = styled.p`
    font-size: 18px;
    font-weight: 300;
    text-align: center;

    @media (max-width: 800px) {
        font-size: 14px;
    }
`;

type Props = {
    title: string;
    icon: StaticImageData;
    children: string;
};

const TextItem: FunctionComponent<Props> = ({ title, icon: { src: icon }, children }) => (
    <Container>
        <Icon src={icon} />
        <Title>{title}</Title>
        <Description>{children}</Description>
    </Container>
);

export default TextItem;
