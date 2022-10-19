import React, { FunctionComponent } from 'react';
import styled from 'styled-components';
import { StaticImageData } from 'next/image';

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 26vw;
`;

const Icon = styled.img`
    width: 60px;
    height: 60px;
`;

const Title = styled.h2`
    font-size: 28px;
    font-weight: 200;
    text-align: center;
    margin: 8px 0;
`;

const Description = styled.p`
    font-size: 18px;
    font-weight: 300;
    text-align: center;
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
