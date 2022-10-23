import { FunctionComponent } from 'react';
import styled from 'styled-components';
import theme, { color } from '../styles/theme';
import shape1 from '../../public/icons/shape1.svg';
import shape2 from '../../public/icons/shape2.svg';
import shape3 from '../../public/icons/shape3.svg';
import shape4 from '../../public/icons/shape4.svg';

export enum ButtonColor {
    'RED',
    'BLUE',
    'YELLOW',
    'GREEN',
}
const colorByType = [theme.red, theme.frost3, theme.yellow, theme.green];
const shapeByType = [shape1.src, shape2.src, shape3.src, shape4.src];

const Button = styled.button<{ background: string }>`
    background: ${props => props.background};
    width: 45vw;
    border-radius: 7px;
    border: none;
    outline: none;
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: 10px;
    transition: filter 0.2s;
    cursor: pointer;

    &:hover {
        filter: brightness(1.1);
    }
`;

const Shape = styled.img`
    width: 36px;
    height: 36px;
`;

const Text = styled.p`
    font-size: 16px;
    color: ${color('white0')};
    margin-left: 10px;
`;

type Props = {
    color: ButtonColor;
    children: string;
    onClick?: () => void;
    className?: string;
};

export const QuizButton: FunctionComponent<Props> = ({ color, children, onClick = () => {}, className }) => (
    <Button onClick={onClick} background={colorByType[color]} className={className}>
        <Shape src={shapeByType[color]} />
        <Text>{children}</Text>
    </Button>
);

export default QuizButton;
