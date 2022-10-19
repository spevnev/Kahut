import React, { FunctionComponent, ReactNode, useState } from 'react';
import styled from 'styled-components';
import { StaticImageData } from 'next/image';
import { color } from '../utils/globalStyles';

const Container = styled.div`
    position: relative;
    display: flex;
`;

const List = styled.div`
    position: absolute;
    top: 100%;
    right: 0;
    z-index: 999999999;
    display: flex;
    flex-direction: column;
    align-items: center;
    transform: translate(-3px, 3px);
    padding: 6px 10px;
    background: ${color('black1')};
    border-radius: 5px;
    box-shadow: 2px 3px 4px rgba(0, 0, 0, 0.3);
    width: fit-content;
`;

const ListItem = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    cursor: pointer;
    width: 100%;
    margin: 2px 0;

    &:hover {
        & img,
        & p {
            filter: brightness(1);
        }
    }

    & img,
    & p {
        transition: filter 0.2s;
        filter: brightness(0.85);
    }
`;

const ItemIcon = styled.img`
    width: 24px;
    height: 24px;
    margin-right: 5px;
`;

const ItemText = styled.p`
    font-size: 16px;
`;

type Item = {
    title: string;
    icon: StaticImageData;
    onClick: () => void;
};

type Props = {
    items: Item[];
    children: ReactNode;
};

const DropDown: FunctionComponent<Props> = ({ items, children }) => {
    const [isOpened, setIsOpened] = useState(false);

    return (
        <Container>
            <Container onClick={() => setIsOpened(!isOpened)} style={{ cursor: 'pointer' }}>
                {children}
            </Container>
            {isOpened && (
                <List>
                    {items.map(({ title, icon: { src }, onClick }) => (
                        <ListItem onClick={() => onClick()} key={title}>
                            <ItemIcon src={src} />
                            <ItemText>{title}</ItemText>
                        </ListItem>
                    ))}
                </List>
            )}
        </Container>
    );
};

export default DropDown;
