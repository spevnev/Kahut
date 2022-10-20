import React, { FunctionComponent } from 'react';
import { StaticImageData } from 'next/image';
import styled from 'styled-components';
import { color } from '../../styles/theme';

const Container = styled.div`
    position: relative;
    width: 46.5vw;
    background: ${color('black3')};
    border-radius: 5px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    padding: 2px 4px;
    box-shadow: 2px 2px 3px rgba(0, 0, 0, 0.25);

    &::after,
    &::before {
        content: '';
        position: absolute;
        bottom: 0;
        left: 10%;
        width: 15px;
        height: 15px;
        background: ${color('black3')};
        transform: translateX(-50%) translateY(50%) rotate(45deg);
        border-radius: 0 0 3px 0;
    }

    &::before {
        box-shadow: 2px 2px 3px rgba(0, 0, 0, 0.25);
        z-index: -1;
    }

    &::after {
        z-index: 1;
    }
`;

const Quote = styled.h3`
    font-size: 20px;
    font-weight: 200;
    color: ${color('white1')};
    margin-bottom: 5px;
`;

const Name = styled.p`
    font-size: 14px;
    font-weight: 300;
    color: ${color('white2')};
`;

const Column = styled.div`
    display: flex;
    flex-direction: column;
    margin: 6px;
`;

const Image = styled.img`
    margin: 6px;
    margin-top: 10px;
    border-radius: 50%;
    width: 64px;
    height: 64px;
`;

type Props = {
    user: {
        name: string;
        image: StaticImageData;
    };
    children: string;
};

const CommentReview: FunctionComponent<Props> = ({ user: { name, image }, children }) => (
    <Container>
        <Image src={image.src} alt="Profile picture" />
        <Column>
            <Quote>"{children}"</Quote>
            <Name>{name}</Name>
        </Column>
    </Container>
);

export default CommentReview;
