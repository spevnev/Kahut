import styled from 'styled-components';

type Props = {
    max: number;
    charsPerPx: number;
    min: number;
};

const ScalingText = styled.p<Props>`
    inline-size: 80%;
    overflow-wrap: break-word;
    font-size: ${props => Math.max(props.min, props.max - (props.children as string).length / props.charsPerPx)}px;
`;

export default ScalingText;
